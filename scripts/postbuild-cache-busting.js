'use strict';

const fs = require('fs');
const path = require('path');

function readJson(filePath) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function escapeForRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceVersionedAsset(html, assetPath, version) {
    const assetPattern = new RegExp(`(${escapeForRegExp(assetPath)})(\\?v=[^"'\\s>]*)?`, 'g');
    return html.replace(assetPattern, `$1?v=${version}`);
}

const projectRoot = path.resolve(__dirname, '..');
const packageJson = readJson(path.join(projectRoot, 'package.json'));
const version = String(packageJson.version || '0.0.0');
const targets = [
    path.join(projectRoot, 'dist/nfc-reserve/index.html'),
    path.join(projectRoot, 'docs/index.html')
];
const assetsToVersion = [
    'favicon.ico',
    'assets/layout/styles/layout/preloading.css',
    'assets/layout/styles/theme/theme-light/indigo/theme.css'
];

for (const filePath of targets) {
    if (!fs.existsSync(filePath)) {
        continue;
    }

    let html = fs.readFileSync(filePath, 'utf8');

    for (const assetPath of assetsToVersion) {
        html = replaceVersionedAsset(html, assetPath, version);
    }

    fs.writeFileSync(filePath, html, 'utf8');
}

process.stdout.write(`Applied cache-busting query params for v${version}\n`);
