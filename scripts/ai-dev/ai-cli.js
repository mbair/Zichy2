const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..', '..');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json'), 'utf8'));
const outputRoot = path.join(repoRoot, config.outputDir);

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function writeJson(filePath, value) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function writeText(filePath, value) {
    ensureDir(path.dirname(filePath));
    fs.writeFileSync(filePath, value, 'utf8');
}

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function fileExists(filePath) {
    return fs.existsSync(filePath);
}

function run(command, args, options = {}) {
    const result = spawnSync(command, args, {
        cwd: options.cwd || repoRoot,
        encoding: 'utf8',
        input: options.input,
        shell: false,
        env: { ...process.env, ...options.env }
    });

    if (result.error) {
        throw result.error;
    }

    if (!options.allowFailure && result.status !== 0) {
        const stderr = result.stderr ? `\n${result.stderr.trim()}` : '';
        throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status}${stderr}`);
    }

    return {
        status: result.status || 0,
        stdout: result.stdout || '',
        stderr: result.stderr || ''
    };
}

function runShell(command, options = {}) {
    return run('bash', ['-lc', command], options);
}

function runOllama(args, options = {}) {
    const candidates = [
        { command: 'ollama', argsPrefix: [] },
        { command: 'cmd.exe', argsPrefix: ['/c', 'ollama'] },
        { command: '/mnt/c/Users/mbair/AppData/Local/Programs/Ollama/ollama.exe', argsPrefix: [] }
    ];

    let lastError = null;
    for (const candidate of candidates) {
        try {
            return run(candidate.command, [...candidate.argsPrefix, ...args], options);
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error('Unable to execute Ollama from this environment.');
}

function listFilesRecursively(rootDir) {
    const output = [];

    function walk(currentDir) {
        const entries = fs.readdirSync(currentDir, { withFileTypes: true });
        for (const entry of entries) {
            if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'dist' || entry.name === 'coverage') {
                continue;
            }

            const fullPath = path.join(currentDir, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            } else {
                output.push(fullPath);
            }
        }
    }

    if (fileExists(rootDir)) {
        walk(rootDir);
    }

    return output;
}

function countLines(text) {
    return text ? text.split(/\r?\n/).length : 0;
}

function relativeToRepo(absolutePath) {
    return path.relative(repoRoot, absolutePath).split(path.sep).join('/');
}

function basenameWithoutKnownSuffix(filePath, suffixes) {
    const fileName = path.basename(filePath);
    for (const suffix of suffixes) {
        if (fileName.endsWith(suffix)) {
            return fileName.slice(0, -suffix.length);
        }
    }

    return fileName.replace(path.extname(fileName), '');
}

function stamp() {
    return new Date().toISOString().replace(/[:.]/g, '-');
}

function dayStamp() {
    return new Date().toISOString().slice(0, 10);
}

function parseArgs(argv) {
    const args = {};
    for (let index = 0; index < argv.length; index += 1) {
        const item = argv[index];
        if (!item.startsWith('--')) {
            continue;
        }

        const key = item.slice(2);
        const next = argv[index + 1];
        if (!next || next.startsWith('--')) {
            args[key] = true;
            continue;
        }

        args[key] = next;
        index += 1;
    }

    return args;
}

function sanitizeTaskId(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function createSummaryBlock(title, lines) {
    return [`## ${title}`, '', ...lines, ''].join('\n');
}

function getCurrentTask() {
    return readJson(path.join(outputRoot, 'current-task.json'));
}

function gitCurrentBranch() {
    return run('git', ['branch', '--show-current'], { allowFailure: true }).stdout.trim();
}

function gitStatusLines() {
    return run('git', ['status', '--short'], { allowFailure: true }).stdout.split(/\r?\n/).filter(Boolean);
}

function gitChangedFiles() {
    return gitStatusLines().map((line) => line.slice(3).trim()).filter(Boolean);
}

function getAiBranchName(taskPayload) {
    return `${config.aiBranchPrefix}/${taskPayload.date}`;
}

function buildCommitMessage(task) {
    return `${config.defaultCommitPrefix}: ${task.title}`;
}

function buildTodoPattern() {
    return `\\b(${config.scan.todoKeywords.join('|')})\\b`;
}

function scanTodos() {
    const result = run(
        'rg',
        ['-n', '--no-heading', buildTodoPattern(), repoRoot, ...config.scan.excludeGlobs.flatMap((glob) => ['--glob', glob])],
        { allowFailure: true }
    );

    if (result.status !== 0 && !result.stdout.trim()) {
        return [];
    }

    return result.stdout
        .split(/\r?\n/)
        .filter(Boolean)
        .map((line) => {
            const match = line.match(/^(.*?):(\d+):(.*)$/);
            if (!match) {
                return null;
            }

            return {
                file: relativeToRepo(match[1]),
                line: Number(match[2]),
                text: match[3].trim()
            };
        })
        .filter(Boolean);
}

function findMatchingTests() {
    const matches = new Map();
    for (const testRoot of config.testRoots) {
        const absoluteRoot = path.join(repoRoot, testRoot);
        for (const absoluteFile of listFilesRecursively(absoluteRoot)) {
            const relativeFile = relativeToRepo(absoluteFile);
            if (!config.testSuffixes.some((suffix) => relativeFile.endsWith(suffix))) {
                continue;
            }

            const base = basenameWithoutKnownSuffix(relativeFile, config.testSuffixes);
            if (!matches.has(base)) {
                matches.set(base, []);
            }

            matches.get(base).push(relativeFile);
        }
    }

    return matches;
}

function scanMissingTests() {
    const testMatches = findMatchingTests();
    const items = [];

    for (const sourceRoot of config.sourceRoots) {
        const absoluteRoot = path.join(repoRoot, sourceRoot);
        for (const absoluteFile of listFilesRecursively(absoluteRoot)) {
            const relativeFile = relativeToRepo(absoluteFile);
            if (config.testSuffixes.some((suffix) => relativeFile.endsWith(suffix))) {
                continue;
            }

            if (!config.candidatePatterns.some((pattern) => relativeFile.endsWith(pattern))) {
                continue;
            }

            const base = basenameWithoutKnownSuffix(relativeFile, config.candidatePatterns);
            const sameFolderSpec = config.testSuffixes
                .map((suffix) => relativeFile.replace(path.extname(relativeFile), suffix))
                .find((candidate) => fs.existsSync(path.join(repoRoot, candidate)));

            if (sameFolderSpec || testMatches.has(base)) {
                continue;
            }

            items.push({
                file: relativeFile,
                baseName: base,
                lineCount: countLines(fs.readFileSync(absoluteFile, 'utf8'))
            });
        }
    }

    return items.sort((left, right) => right.lineCount - left.lineCount);
}

function scanLargeFiles() {
    const items = [];
    for (const sourceRoot of config.sourceRoots) {
        const absoluteRoot = path.join(repoRoot, sourceRoot);
        for (const absoluteFile of listFilesRecursively(absoluteRoot)) {
            const extension = path.extname(absoluteFile);
            const threshold = config.scan.largeFileThresholds[extension];
            if (!threshold) {
                continue;
            }

            const relativeFile = relativeToRepo(absoluteFile);
            if (config.testSuffixes.some((suffix) => relativeFile.endsWith(suffix))) {
                continue;
            }

            const lineCount = countLines(fs.readFileSync(absoluteFile, 'utf8'));
            if (lineCount < threshold) {
                continue;
            }

            items.push({
                file: relativeFile,
                extension,
                lineCount,
                threshold
            });
        }
    }

    return items.sort((left, right) => right.lineCount - left.lineCount);
}

function scanCommand() {
    const report = {
        generatedAt: new Date().toISOString(),
        repoId: config.repoId,
        repoLabel: config.repoLabel,
        repoRoot: repoRoot,
        git: {
            branch: gitCurrentBranch(),
            clean: gitStatusLines().length === 0,
            changedFiles: gitStatusLines()
        },
        todos: scanTodos(),
        missingTests: scanMissingTests(),
        largeFiles: scanLargeFiles()
    };

    const latestJson = path.join(outputRoot, 'scan-report.latest.json');
    writeJson(latestJson, report);
    writeJson(path.join(outputRoot, 'history', `${stamp()}-scan-report.json`), report);
    writeText(
        path.join(outputRoot, 'scan-report.latest.md'),
        [
            `# ${config.workspaceName} AI Scan`,
            '',
            `Generated at: ${report.generatedAt}`,
            '',
            createSummaryBlock('Summary', [
                `- Branch: \`${report.git.branch || 'unknown'}\``,
                `- Working tree clean: \`${report.git.clean}\``,
                `- TODO count: \`${report.todos.length}\``,
                `- Missing test candidates: \`${report.missingTests.length}\``,
                `- Large file hotspots: \`${report.largeFiles.length}\``
            ]),
            report.todos.length ? createSummaryBlock('Top TODOs', report.todos.slice(0, 8).map((todo) => `- ${todo.file}:${todo.line} ${todo.text}`)) : ''
        ].filter(Boolean).join('\n')
    );

    process.stdout.write(`${latestJson}\n`);
}

function classifyTodo(todo) {
    const text = todo.text.toLowerCase();
    const normalized = text.replace(/[^a-z0-9]+/g, ' ').trim();

    if (text.includes('teszt') || text.includes('test')) {
        if (normalized === 'todo teszt' || normalized === 'todo test') {
            return { kind: 'manual-follow-up', safeToAutomate: false, score: 35, titlePrefix: 'Clarify test TODO' };
        }

        return { kind: 'add-test-from-todo', safeToAutomate: true, score: 95, titlePrefix: 'Write test requested by TODO' };
    }

    if (text.includes('not used') || text.includes('redundant')) {
        return { kind: 'cleanup-todo', safeToAutomate: true, score: 72, titlePrefix: 'Clean up redundant code' };
    }

    if (text.includes('password') || text.includes('jwt') || text.includes('auth') || text.includes('endpoint')) {
        return { kind: 'manual-follow-up', safeToAutomate: false, score: 45, titlePrefix: 'Manual review TODO' };
    }

    return { kind: 'manual-follow-up', safeToAutomate: false, score: 50, titlePrefix: 'Review TODO' };
}

function validationCommandsFor(kind, file) {
    if (kind === 'missing-test' || kind === 'add-test-from-todo') {
        const specPath = file.endsWith('.ts') ? file.replace(/\.ts$/, '.spec.ts') : file;
        return ['npm lint', `npm test -- --watch=false --include=${specPath}`];
    }

    return config.safeValidationCommands;
}

function allowedWritePathsForTask(kind, file) {
    if (kind === 'missing-test' || kind === 'add-test-from-todo') {
        return [file, file.replace(/\.ts$/, '.spec.ts')];
    }

    return [file];
}

function backlogCommand() {
    const reportPath = path.join(outputRoot, 'scan-report.latest.json');
    if (!fileExists(reportPath)) {
        scanCommand();
    }

    const report = readJson(reportPath);
    const tasks = [];

    for (const missing of report.missingTests) {
        tasks.push({
            id: sanitizeTaskId(`${config.repoId}-${missing.file}-missing-test`),
            repoId: config.repoId,
            repoLabel: config.repoLabel,
            title: `Add missing spec for ${path.basename(missing.file)}`,
            kind: 'missing-test',
            safeToAutomate: true,
            score: 90,
            file: missing.file,
            line: null,
            reason: `${missing.file} has no matching automated test file.`,
            allowedWritePaths: allowedWritePathsForTask('missing-test', missing.file),
            validationCommands: validationCommandsFor('missing-test', missing.file)
        });
    }

    for (const todo of report.todos) {
        const classification = classifyTodo(todo);
        tasks.push({
            id: sanitizeTaskId(`${config.repoId}-${todo.file}-${todo.line}-${classification.kind}`),
            repoId: config.repoId,
            repoLabel: config.repoLabel,
            title: `${classification.titlePrefix}: ${path.basename(todo.file)}`,
            kind: classification.kind,
            safeToAutomate: classification.safeToAutomate,
            score: classification.score,
            file: todo.file,
            line: todo.line,
            reason: todo.text,
            allowedWritePaths: allowedWritePathsForTask(classification.kind, todo.file),
            validationCommands: validationCommandsFor(classification.kind, todo.file)
        });
    }

    for (const largeFile of report.largeFiles.slice(0, 8)) {
        tasks.push({
            id: sanitizeTaskId(`${config.repoId}-${largeFile.file}-hotspot`),
            repoId: config.repoId,
            repoLabel: config.repoLabel,
            title: `Review large hotspot ${path.basename(largeFile.file)}`,
            kind: 'large-hotspot-review',
            safeToAutomate: false,
            score: 40,
            file: largeFile.file,
            line: null,
            reason: `${largeFile.file} is ${largeFile.lineCount} lines long.`,
            allowedWritePaths: [largeFile.file],
            validationCommands: config.safeValidationCommands
        });
    }

    const backlog = {
        generatedAt: new Date().toISOString(),
        date: dayStamp(),
        defaultModel: config.defaultModel,
        plannerModel: config.plannerModel,
        tasks: tasks.sort((left, right) => right.score - left.score || left.title.localeCompare(right.title)).slice(0, 30)
    };

    writeJson(path.join(outputRoot, 'daily-backlog.latest.json'), backlog);
    writeText(
        path.join(outputRoot, 'daily-backlog.latest.md'),
        [
            `# ${config.workspaceName} AI Daily Backlog`,
            '',
            `Generated at: ${backlog.generatedAt}`,
            '',
            createSummaryBlock('Summary', [
                `- Total tasks: \`${backlog.tasks.length}\``,
                `- Safe to automate: \`${backlog.tasks.filter((task) => task.safeToAutomate).length}\``,
                `- Needs manual review: \`${backlog.tasks.filter((task) => !task.safeToAutomate).length}\``,
                `- Default worker model: \`${config.defaultModel}\``
            ]),
            createSummaryBlock('Top Safe Tasks', backlog.tasks.filter((task) => task.safeToAutomate).slice(0, 10).map((task) => `- [${task.id}] ${task.title} (score ${task.score})`)),
            createSummaryBlock('Manual Review Queue', backlog.tasks.filter((task) => !task.safeToAutomate).slice(0, 10).map((task) => `- [${task.id}] ${task.title} (score ${task.score})`))
        ].join('\n')
    );

    process.stdout.write(`${path.join(outputRoot, 'daily-backlog.latest.json')}\n`);
}

function pickTask(args) {
    const backlogPath = path.join(outputRoot, 'daily-backlog.latest.json');
    if (!fileExists(backlogPath)) {
        backlogCommand();
    }

    const backlog = readJson(backlogPath);
    if (args.task) {
        const exact = backlog.tasks.find((task) => task.id === args.task);
        if (!exact) {
            throw new Error(`Task not found: ${args.task}`);
        }

        return exact;
    }

    const fallback = backlog.tasks.find((task) => task.safeToAutomate);
    if (!fallback) {
        throw new Error('No safe task available in backlog.');
    }

    return fallback;
}

function readExcerpt(relativeFile, line) {
    const absoluteFile = path.join(repoRoot, relativeFile);
    if (!fileExists(absoluteFile)) {
        return { path: relativeFile, note: 'File does not exist yet.', content: '' };
    }

    const lines = fs.readFileSync(absoluteFile, 'utf8').split(/\r?\n/);
    if (!line || lines.length <= 260) {
        return {
            path: relativeFile,
            note: lines.length <= 260 ? 'Full file included.' : 'Leading excerpt included.',
            content: lines.slice(0, 260).join('\n')
        };
    }

    const start = Math.max(line - 25, 0);
    const end = Math.min(line + 25, lines.length);
    return {
        path: relativeFile,
        note: `Excerpt around line ${line}.`,
        content: lines.slice(start, end).join('\n')
    };
}

function findNearbySpecExamples(task) {
    if (task.kind !== 'missing-test') {
        return [];
    }

    const targetSpec = task.file.replace(/\.ts$/, '.spec.ts');
    const searchRoots = [];
    let current = path.dirname(task.file);
    for (let depth = 0; depth < 3; depth += 1) {
        searchRoots.push(current);
        const next = path.dirname(current);
        if (next === current) {
            break;
        }
        current = next;
    }

    const examples = [];
    const seen = new Set();
    for (const searchRoot of searchRoots) {
        for (const absoluteFile of listFilesRecursively(path.join(repoRoot, searchRoot))) {
            const relativeFile = relativeToRepo(absoluteFile);
            if (relativeFile === targetSpec || !relativeFile.endsWith('.spec.ts') || seen.has(relativeFile)) {
                continue;
            }

            seen.add(relativeFile);
            examples.push({
                path: relativeFile,
                note: 'Nearby spec example.',
                content: fs.readFileSync(absoluteFile, 'utf8').split(/\r?\n/).slice(0, 220).join('\n')
            });

            if (examples.length >= 2) {
                return examples;
            }
        }
    }

    return examples;
}

function promptCommand(args) {
    const task = pickTask(args);
    const model = args.model || config.defaultModel;
    const excerpts = task.allowedWritePaths.map((relativeFile) => readExcerpt(relativeFile, task.line));
    const nearbyExamples = findNearbySpecExamples(task);
    const taskSpecificHints = task.kind === 'missing-test'
        ? [
            '- For a missing frontend spec, creating a minimal Angular smoke test is acceptable.',
            '- Prefer matching existing spec style from nearby files.',
            '- If the component has little logic, test that the component instance can be created.'
        ]
        : [];

    const prompt = [
        `You are working inside the ${config.workspaceName.toLowerCase()} repo.`,
        '',
        'Task:',
        `- id: ${task.id}`,
        `- title: ${task.title}`,
        `- reason: ${task.reason}`,
        `- repo root: .`,
        `- allowed write paths: ${task.allowedWritePaths.join(', ')}`,
        `- requested model: ${model}`,
        '',
        'Constraints:',
        '- Keep the diff small and focused.',
        '- Touch at most 3 files.',
        '- Do not edit package-lock files, build output, generated docs, env files, or deployment scripts.',
        '- If the task is unclear or unsafe, respond with NO_SAFE_PATCH and a one sentence reason.',
        '- Output only a git unified diff fenced with ```diff.',
        '- Diff paths must be relative to the repo root.',
        '- Do not include prose before or after the diff.',
        ...taskSpecificHints,
        '',
        'Validation commands that the human reviewer should run after applying the patch:',
        ...task.validationCommands.map((command) => `- ${command}`),
        '',
        'Relevant file excerpts:',
        ...excerpts.flatMap((excerpt) => [`File: ${excerpt.path}`, `Note: ${excerpt.note}`, '```', excerpt.content, '```', '']),
        ...(nearbyExamples.length
            ? [
                'Nearby spec examples:',
                ...nearbyExamples.flatMap((example) => [`File: ${example.path}`, `Note: ${example.note}`, '```', example.content, '```', ''])
            ]
            : [])
    ].join('\n');

    const payload = {
        createdAt: new Date().toISOString(),
        date: dayStamp(),
        model,
        task
    };

    const baseName = `${stamp()}-${task.id}`;
    writeText(path.join(outputRoot, 'prompts', `${baseName}.md`), prompt);
    writeJson(path.join(outputRoot, 'prompts', `${baseName}.json`), payload);
    writeText(path.join(outputRoot, 'current-task.prompt.md'), prompt);
    writeJson(path.join(outputRoot, 'current-task.json'), payload);

    process.stdout.write(`${path.join(outputRoot, 'prompts', `${baseName}.md`)}\n`);
}

function extractDiffBlock(response) {
    const fenced = response.match(/```diff\s*([\s\S]*?)```/i);
    if (fenced) {
        return `${fenced[1].trim()}\n`;
    }

    if (response.trim().startsWith('diff --git')) {
        return `${response.trim()}\n`;
    }

    return null;
}

function normalizeUnifiedDiff(diffText) {
    const lines = diffText.replace(/\r\n/g, '\n').split('\n');
    const output = [];

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        if (!line.startsWith('@@')) {
            output.push(line);
            continue;
        }

        const headerMatch = line.match(/^@@\s+-(\d+)(?:,(\d+))?\s+\+(\d+)(?:,(\d+))?\s+@@(.*)$/);
        if (!headerMatch) {
            output.push(line);
            continue;
        }

        const hunkBody = [];
        let cursor = index + 1;
        while (cursor < lines.length) {
            const bodyLine = lines[cursor];
            if (bodyLine.startsWith('diff --git ') || bodyLine.startsWith('@@ ')) {
                break;
            }

            hunkBody.push(bodyLine);
            cursor += 1;
        }

        const oldCount = hunkBody.filter((bodyLine) => bodyLine.startsWith(' ') || bodyLine.startsWith('-')).length;
        const newCount = hunkBody.filter((bodyLine) => bodyLine.startsWith(' ') || bodyLine.startsWith('+')).length;
        const [, oldStart, , newStart, , trailing = ''] = headerMatch;

        output.push(`@@ -${oldStart},${oldCount} +${newStart},${newCount} @@${trailing}`);
        output.push(...hunkBody);
        index = cursor - 1;
    }

    return `${output.join('\n').trimEnd()}\n`;
}

function runCommand(args) {
    const taskPayload = getCurrentTask();
    const prompt = fs.readFileSync(path.join(outputRoot, 'current-task.prompt.md'), 'utf8');
    const model = args.model || taskPayload.model || config.defaultModel;
    const version = runOllama(['--version']).stdout.trim();
    const response = runOllama(['run', model], { input: prompt }).stdout;
    const rawDiff = extractDiffBlock(response);
    const diff = rawDiff ? normalizeUnifiedDiff(rawDiff) : null;
    const baseName = `${stamp()}-${taskPayload.task.id}`;

    writeText(path.join(outputRoot, 'runs', `${baseName}.response.md`), response);
    writeJson(path.join(outputRoot, 'runs', `${baseName}.json`), {
        createdAt: new Date().toISOString(),
        model,
        ollamaVersion: version,
        task: taskPayload.task,
        diffFile: diff ? `${baseName}.patch` : null
    });

    if (diff) {
        writeText(path.join(outputRoot, 'runs', `${baseName}.patch`), diff);
        writeText(path.join(outputRoot, 'latest-run.patch'), diff);
    }

    writeText(path.join(outputRoot, 'latest-run.response.md'), response);
    process.stdout.write(diff ? path.join(outputRoot, 'runs', `${baseName}.patch`) : 'NO_DIFF_EXTRACTED\n');
}

function extractTouchedFiles(patch) {
    const files = new Set();
    for (const line of patch.split(/\r?\n/)) {
        if (line.startsWith('+++ b/')) {
            files.add(line.slice('+++ b/'.length).trim());
        }
    }

    return [...files];
}

function isAllowed(task, touchedFiles) {
    if (touchedFiles.length === 0 || touchedFiles.length > 3) {
        return false;
    }

    return touchedFiles.every((file) => {
        if (config.forbiddenPathPrefixes.some((prefix) => file.startsWith(prefix))) {
            return false;
        }

        return task.allowedWritePaths.some((allowed) => file === allowed || file.startsWith(`${allowed}/`));
    });
}

function applyCommand(args) {
    const patchPath = args.file ? path.resolve(args.file) : path.join(outputRoot, 'latest-run.patch');
    if (!fileExists(patchPath)) {
        throw new Error(`No patch file found at ${patchPath}. The model likely returned NO_SAFE_PATCH or free-form text.`);
    }

    const taskPayload = getCurrentTask();
    const patch = fs.readFileSync(patchPath, 'utf8');
    const touchedFiles = extractTouchedFiles(patch);
    if (!taskPayload.task.safeToAutomate) {
        throw new Error(`Task ${taskPayload.task.id} is not marked safe to automate.`);
    }

    if (!isAllowed(taskPayload.task, touchedFiles)) {
        throw new Error(`Patch touches files outside the allowed write scope: ${touchedFiles.join(', ')}`);
    }

    run('git', ['apply', '--check', '--whitespace=nowarn', '-'], { input: patch });
    if (args.apply) {
        run('git', ['apply', '--whitespace=nowarn', '-'], { input: patch });
        process.stdout.write(`APPLIED ${patchPath}\n`);
        return;
    }

    process.stdout.write(`PATCH_OK ${patchPath}\n`);
}

function branchCommand(args) {
    const taskPayload = getCurrentTask();
    const branchName = getAiBranchName(taskPayload);
    const currentBranch = gitCurrentBranch();
    const statusLines = gitStatusLines();
    if (statusLines.length > 0) {
        throw new Error('Repo is not clean. Refusing to switch to AI branch.');
    }

    const existingBranch = run('git', ['rev-parse', '--verify', '--quiet', branchName], { allowFailure: true }).status === 0;
    if (!args['dry-run']) {
        if (currentBranch === branchName) {
            // no-op
        } else if (existingBranch) {
            run('git', ['checkout', branchName]);
        } else {
            run('git', ['checkout', '-b', branchName]);
        }
    }

    writeJson(path.join(outputRoot, 'current-branch.json'), {
        createdAt: new Date().toISOString(),
        baseBranch: currentBranch,
        branchName,
        existingBranch,
        dryRun: Boolean(args['dry-run'])
    });

    process.stdout.write(`${branchName}\n`);
}

function validateCommand(args) {
    const taskPayload = getCurrentTask();
    const results = [];
    for (const command of taskPayload.task.validationCommands || []) {
        if (args['dry-run']) {
            results.push({ command, status: 'skipped' });
            continue;
        }

        const result = runShell(command, { allowFailure: true });
        results.push({
            command,
            status: result.status === 0 ? 'passed' : 'failed',
            exitCode: result.status,
            stdout: result.stdout,
            stderr: result.stderr
        });

        if (result.status !== 0) {
            break;
        }
    }

    const allPassed = results.every((result) => result.status === 'passed' || result.status === 'skipped');
    const payload = {
        createdAt: new Date().toISOString(),
        task: taskPayload.task,
        allPassed,
        dryRun: Boolean(args['dry-run']),
        results
    };
    writeJson(path.join(outputRoot, 'validations', `${stamp()}-${taskPayload.task.id}-validation.json`), payload);
    writeJson(path.join(outputRoot, 'latest-validation.json'), payload);
    writeText(
        path.join(outputRoot, 'latest-validation.md'),
        `${results.map((result) => [`Command: ${result.command}`, `Status: ${result.status}`, result.stdout ? `STDOUT:\n${result.stdout.trim()}` : '', result.stderr ? `STDERR:\n${result.stderr.trim()}` : '', ''].filter(Boolean).join('\n')).join('\n').trim()}\n`
    );

    if (!allPassed) {
        throw new Error('Validation failed for current task.');
    }

    process.stdout.write(`VALIDATION_OK ${taskPayload.task.id}\n`);
}

function commitCommand(args) {
    const isDryRun = Boolean(args['dry-run']);
    const taskPayload = getCurrentTask();
    const changedFiles = gitChangedFiles();
    const currentBranch = gitCurrentBranch();
    const expectedBranch = getAiBranchName(taskPayload);
    const validation = readJson(path.join(outputRoot, 'latest-validation.json'));

    if (!isDryRun && !isAllowed(taskPayload.task, changedFiles)) {
        throw new Error(`Refusing to commit unexpected file set: ${changedFiles.join(', ')}`);
    }

    if (!isDryRun && currentBranch !== expectedBranch) {
        throw new Error(`Refusing to commit outside AI branch. Current: ${currentBranch}, expected: ${expectedBranch}`);
    }

    if (!validation.allPassed || validation.task.id !== taskPayload.task.id) {
        throw new Error('Refusing to commit without a matching successful validation run.');
    }

    const message = args.message || buildCommitMessage(taskPayload.task);
    if (!isDryRun) {
        run('git', ['add', '--', ...changedFiles]);
        run('git', ['commit', '-m', message]);
    }

    writeJson(path.join(outputRoot, 'latest-commit.json'), {
        createdAt: new Date().toISOString(),
        task: taskPayload.task,
        branch: currentBranch,
        expectedBranch,
        changedFiles,
        message,
        commitSha: isDryRun ? null : run('git', ['rev-parse', 'HEAD']).stdout.trim(),
        dryRun: isDryRun
    });

    process.stdout.write(`${message}\n`);
}

function dailyCommand(args) {
    scanCommand();
    backlogCommand();

    if (args.prepare || args.run || args.apply) {
        promptCommand(args);
    }

    if (args.branch) {
        branchCommand(args);
    }

    if (args.run || args.apply) {
        runCommand(args);
    }

    if (args.apply) {
        applyCommand({ apply: true });
    }

    if (args.validate || args.commit) {
        validateCommand(args);
    }

    if (args.commit) {
        commitCommand(args);
    }

    process.stdout.write(`${path.join(outputRoot, 'daily-backlog.latest.md')}\n`);
    process.stdout.write(`Default model: ${args.model || config.defaultModel}\n`);
}

function main() {
    const [command, ...restArgs] = process.argv.slice(2);
    const args = parseArgs(restArgs);
    const commands = {
        scan: () => scanCommand(),
        backlog: () => backlogCommand(),
        prompt: () => promptCommand(args),
        run: () => runCommand(args),
        apply: () => applyCommand(args),
        branch: () => branchCommand(args),
        validate: () => validateCommand(args),
        commit: () => commitCommand(args),
        daily: () => dailyCommand(args)
    };

    if (!commands[command]) {
        throw new Error(`Unknown AI command: ${command || '(missing)'}`);
    }

    commands[command]();
}

main();
