import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './playwright',
    fullyParallel: false,
    timeout: 30_000,
    expect: {
        timeout: 5_000
    },
    reporter: [['list'], ['html', { open: 'never' }]],
    use: {
        baseURL: 'http://127.0.0.1:4217',
        headless: true,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        video: 'retain-on-failure'
    },
    webServer: {
        command: 'bash -lc \'export NVM_DIR="$HOME/.nvm"; . "$NVM_DIR/nvm.sh"; nvm use 24 >/dev/null; npm run start -- --host 127.0.0.1 --port 4217\'',
        url: 'http://127.0.0.1:4217',
        reuseExistingServer: false,
        timeout: 120_000
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome']
            }
        }
    ]
});
