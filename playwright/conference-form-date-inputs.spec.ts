import { expect, test } from '@playwright/test';

test('conference form PrimeNG date pickers support mouse selection', async ({ page }) => {
    await page.goto('/#/conference-form/20250629-20250704-bpa-nyari-tabor');
    await page.waitForSelector('conference-form');

    await page.evaluate(() => {
        const host = document.querySelector('conference-form');
        const cmp = host && window.ng && window.ng.getComponent ? window.ng.getComponent(host) : null;

        if (!cmp) {
            return;
        }

        cmp.canFillFormAfterDeadline = true;
        cmp.registrationEnded = false;
        cmp.showForm = true;
        cmp.translate.use('hu');
        cmp.currentLang = 'hu';
        cmp.cdRef.detectChanges();
    });

    const dateOfArrival = page.locator('input#dateOfArrival');
    const dateOfDeparture = page.locator('input#dateOfDeparture');

    await expect(dateOfArrival).toHaveAttribute('type', 'text');
    await expect(dateOfDeparture).toHaveAttribute('type', 'text');

    await dateOfArrival.click();
    let overlay = page.locator('div.p-datepicker:visible').last();
    await expect(overlay).toBeVisible();
    await overlay.locator('td span:not(.p-disabled)', { hasText: '29' }).first().click();
    await expect(dateOfArrival).toHaveValue('2025.06.29');

    await dateOfDeparture.click();
    overlay = page.locator('div.p-datepicker:visible').last();
    await expect(overlay).toBeVisible();
    await overlay.locator('td span:not(.p-disabled)', { hasText: '30' }).first().click();
    await expect(dateOfDeparture).toHaveValue('2025.06.30');

    const formValues = await page.evaluate(() => {
        const host = document.querySelector('conference-form');
        const cmp = host && window.ng && window.ng.getComponent ? window.ng.getComponent(host) : null;

        return cmp ? {
            dateOfArrival: cmp.conferenceForm.get('dateOfArrival')?.value,
            dateOfDeparture: cmp.conferenceForm.get('dateOfDeparture')?.value,
            arrivalErrors: cmp.conferenceForm.get('dateOfArrival')?.errors ?? null,
            departureErrors: cmp.conferenceForm.get('dateOfDeparture')?.errors ?? null
        } : null;
    });

    expect(formValues).toEqual({
        dateOfArrival: '2025-06-29',
        dateOfDeparture: '2025-06-30',
        arrivalErrors: null,
        departureErrors: null
    });
});
