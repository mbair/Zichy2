'use strict';

const { execFileSync } = require('child_process');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

function run(command, args) {
    execFileSync(command, args, {
        cwd: projectRoot,
        stdio: 'inherit'
    });
}

if (process.env.SKIP_VERSION_BUMP !== '1') {
    run(npmCommand, ['run', 'bump:patch']);
}

run(process.execPath, [path.join(__dirname, 'generate-version.js')]);
