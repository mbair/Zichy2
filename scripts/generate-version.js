'use strict';

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeIfChanged(filePath, content) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    const currentContent = fs.existsSync(filePath)
        ? fs.readFileSync(filePath, 'utf8')
        : null;

    if (currentContent === content) {
        return;
    }

    fs.writeFileSync(filePath, content, 'utf8');
}

const projectRoot = path.resolve(__dirname, '..');
const packageJson = readJson(path.join(projectRoot, 'package.json'));
const version = String(packageJson.version || '0.0.0');
const buildTime = new Date().toISOString();

writeIfChanged(
    path.join(projectRoot, 'src/app/app-version.ts'),
    [
        `export const APP_VERSION = ${JSON.stringify(version)};`,
        `export const APP_BUILD_TIME = ${JSON.stringify(buildTime)};`,
        ''
    ].join('\n')
);

writeIfChanged(
    path.join(projectRoot, 'src/assets/version.json'),
    `${JSON.stringify({ version, buildTime }, null, 2)}\n`
);

process.stdout.write(`Generated app version files for v${version}\n`);
