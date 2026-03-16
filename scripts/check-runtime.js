'use strict';

const cp = require('child_process');
const fs = require('fs');
const path = require('path');

function fail(message) {
    console.error(`\nRuntime version check failed.\n${message}\n`);
    process.exit(1);
}

function readPackageJson(packageJsonPath) {
    try {
        const content = fs.readFileSync(packageJsonPath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        fail(`Could not read package.json at ${packageJsonPath}: ${error.message}`);
    }
}

function parseExpectedNpmVersion(packageManager) {
    if (typeof packageManager !== 'string') return null;
    const match = packageManager.match(/^npm@(.+)$/);
    return match ? match[1] : null;
}

function parseActualNpmVersion() {
    const ua = process.env.npm_config_user_agent || '';
    const match = ua.match(/npm\/([0-9]+\.[0-9]+\.[0-9]+)/);
    if (match) return match[1];

    try {
        return cp.execSync('npm --version', { encoding: 'utf8' }).trim();
    } catch (_error) {
        return null;
    }
}

const packageJsonPath = process.argv[2]
    ? path.resolve(process.argv[2])
    : path.resolve(process.cwd(), 'package.json');

const packageJson = readPackageJson(packageJsonPath);
const expectedNodeVersion = String(packageJson.engines?.node || '').trim();
const expectedNpmVersion = parseExpectedNpmVersion(packageJson.packageManager);

if (!expectedNodeVersion) {
    fail(`Missing exact "engines.node" version in ${packageJsonPath}.`);
}

const actualNodeVersion = process.version.replace(/^v/, '');
if (actualNodeVersion !== expectedNodeVersion) {
    fail(`Expected Node.js ${expectedNodeVersion}, but found ${actualNodeVersion}. Run: nvm use`);
}

if (expectedNpmVersion) {
    const actualNpmVersion = parseActualNpmVersion();
    if (!actualNpmVersion) {
        fail(`Could not detect npm version. Expected npm ${expectedNpmVersion}.`);
    }
    if (actualNpmVersion !== expectedNpmVersion) {
        fail(`Expected npm ${expectedNpmVersion}, but found ${actualNpmVersion}.`);
    }
}

process.stdout.write(
    `Runtime OK: Node.js ${actualNodeVersion}` +
    (expectedNpmVersion ? `, npm ${expectedNpmVersion}` : '') +
    '\n'
);
