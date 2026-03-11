import { expect, test } from '@playwright/test';

test('conference form uses native date inputs and updates the form model', async ({ page }) => {
    await page.goto('/#/conference-form/20250629-20250704-bpa-nyari-tabor');

    const birthDate = page.locator('input#birthDate');
    const dateOfArrival = page.locator('input#dateOfArrival');
    const dateOfDeparture = page.locator('input#dateOfDeparture');

    await expect(birthDate).toHaveAttribute('type', 'date');
    await expect(dateOfArrival).toHaveAttribute('type', 'date');
    await expect(dateOfDeparture).toHaveAttribute('type', 'date');

    await birthDate.fill('2026-03-11');
    await birthDate.blur();
    await dateOfArrival.fill('2025-06-29');
    await dateOfArrival.blur();
    await dateOfDeparture.fill('2025-07-04');
    await dateOfDeparture.blur();

    await expect(birthDate).toHaveValue('2026-03-11');
    await expect(dateOfArrival).toHaveValue('2025-06-29');
    await expect(dateOfDeparture).toHaveValue('2025-07-04');

    const formValues = await page.evaluate(() => {
        const host = document.querySelector('conference-form');
        const cmp = host && window.ng && window.ng.getComponent ? window.ng.getComponent(host) : null;

        return cmp ? {
            birthDate: cmp.conferenceForm.get('birthDate')?.value,
            dateOfArrival: cmp.conferenceForm.get('dateOfArrival')?.value,
            dateOfDeparture: cmp.conferenceForm.get('dateOfDeparture')?.value
        } : null;
    });

    expect(formValues).toEqual({
        birthDate: '2026-03-11',
        dateOfArrival: '2025-06-29',
        dateOfDeparture: '2025-07-04'
    });
});
