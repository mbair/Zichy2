import { expect, test } from '@playwright/test';

test('mouse selection updates the input and emitted model', async ({ page }) => {
    await page.goto('/#/dev/localized-date-picker');

    await expect(page.getByTestId('current-lang')).toHaveText('hu');

    const input = page.locator('input#debug-localized-date-picker');
    await input.click();

    const overlay = page.locator('div.p-datepicker');
    await expect(overlay).toBeVisible();

    await overlay.getByText('11', { exact: true }).click();

    await expect(input).toHaveValue('2026.03.11');
    await expect(page.getByTestId('model-value')).toHaveText('2026-03-11');
    await expect(page.getByTestId('select-value')).toHaveText('2026-03-11');
    await expect(page.getByTestId('select-count')).toHaveText('1');
});

test('raw PrimeNG calendar still reacts to mouse selection', async ({ page }) => {
    await page.goto('/#/dev/localized-date-picker');

    const input = page.locator('input#debug-raw-date-picker');
    await input.click();

    const overlay = page.locator('div.p-datepicker');
    await expect(overlay).toBeVisible();

    await overlay.getByText('11', { exact: true }).click();

    await expect(input).toHaveValue('2026.03.11');
    await expect(page.getByTestId('raw-value')).toHaveText('2026-03-11');
    await expect(page.getByTestId('raw-select-value')).toHaveText('2026-03-11');
});
