import { expect, test, type Page, type Route } from '@playwright/test';

const CONFERENCE_ID = 99;
const CONFERENCE_NAME = '20260628-20260703 BPA nyári tábor';

function seedAuthenticatedSession(page: Page): Promise<void> {
    return page.addInitScript(() => {
        const futureExpiry = Date.now() + 60 * 60 * 1000;
        sessionStorage.setItem('session_expires_at', String(futureExpiry));
        sessionStorage.setItem('userid', '1');
        sessionStorage.setItem('userrole', 'Super Admin');
        sessionStorage.setItem('user_rolesid', '1');
        sessionStorage.setItem('fullname', 'E2E Admin');
        sessionStorage.setItem('email', 'e2e@example.com');
    });
}

async function installGuestPageMocks(page: Page): Promise<void> {
    await page.route('**/api/**', async (route: Route) => {
        const url = new URL(route.request().url());
        const path = url.pathname;

        if (path.includes('/api/conference/selector')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([
                    {
                        id: CONFERENCE_ID,
                        name: CONFERENCE_NAME,
                        beginDate: '2026-06-28',
                        endDate: '2026-07-03',
                        roomTypeIds: [6],
                        enabled: 1,
                    },
                ]),
            });
            return;
        }

        if (path.includes(`/api/conference/getbyid/${CONFERENCE_ID}`)) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows: [
                        {
                            id: CONFERENCE_ID,
                            name: CONFERENCE_NAME,
                            beginDate: '2026-06-28',
                            endDate: '2026-07-03',
                            firstMeal: 'vacsora',
                            lastMeal: 'ebéd',
                            guestEditEndDate: '2099-12-31',
                            paymentMethodIds: [1],
                            roomTypeIds: [6],
                        },
                    ],
                }),
            });
            return;
        }

        if (path.includes('/api/guest/get/')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows: [
                        {
                            id: 1,
                            firstName: 'Teszt',
                            lastName: 'Vendég',
                            gender: 1,
                            nationality: 'HU',
                            country: 'Hungary',
                            zipCode: '2112',
                            dateOfArrival: '2026-06-28',
                            firstMeal: 'vacsora',
                            dateOfDeparture: '2026-06-30',
                            lastMeal: 'ebéd',
                            birthDate: '1974-10-16',
                            diet: 'normál',
                            email: 'teszt@example.com',
                            telephone: '+361234567',
                            roomType: 'Maranatha Panzióház 4 ágyas szoba (emeletes ágyas, külön fürdős)',
                            payment: 1,
                            paymentMethodName: 'Banki átutalás',
                            conferenceid: CONFERENCE_ID,
                            conferenceName: CONFERENCE_NAME,
                            enabled: 1,
                            reservations: [],
                        },
                    ],
                    totalItems: 1,
                    currentPage: 0,
                    rfidCount: 0,
                }),
            });
            return;
        }

        if (path.includes('/api/diet/get/')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    rows: [
                        { id: 1, name: 'normál', color: 'green' },
                        { id: 2, name: 'nem kér étkezést', color: 'gray' },
                    ],
                    count: 2,
                }),
            });
            return;
        }

        if (path.includes('/api/users/refresh-session')) {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ ok: true }),
                headers: {
                    'X-Session-Expires-At': String(Date.now() + 60 * 60 * 1000),
                },
            });
            return;
        }

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ rows: [], totalItems: 0, currentPage: 0, rfidCount: 0 }),
        });
    });
}

async function getFirstMealValues(page: Page): Promise<string[]> {
    return page.evaluate(() => {
        const host = document.querySelector('#sidebar app-meal-selector[controlname="firstMeal"]');
        const cmp =
            host && (window as any).ng && (window as any).ng.getComponent
                ? (window as any).ng.getComponent(host)
                : null;

        return cmp ? cmp.meals.map((meal: { value: string }) => meal.value) : [];
    });
}

async function getLastMealValues(page: Page): Promise<string[]> {
    return page.evaluate(() => {
        const host = document.querySelector('#sidebar app-meal-selector[controlname="lastMeal"]');
        const cmp =
            host && (window as any).ng && (window as any).ng.getComponent
                ? (window as any).ng.getComponent(host)
                : null;

        return cmp ? cmp.meals.map((meal: { value: string }) => meal.value) : [];
    });
}

async function pickDate(page: Page, inputId: string, isoDate: string): Promise<void> {
    const input = page.locator(`input#${inputId}`);
    const [yearText, monthText, dayText] = isoDate.split('-');
    const year = Number.parseInt(yearText ?? '', 10);
    const monthIndex = Number.parseInt(monthText ?? '', 10) - 1;
    const day = Number.parseInt(dayText ?? '', 10);

    await input.click();

    const overlay = page.locator('.p-datepicker:visible').last();
    await expect(overlay).toBeVisible();

    await overlay.locator('button.p-datepicker-year').click();
    const yearOptions = overlay.locator('.p-yearpicker-year');
    await expect(yearOptions.first()).toBeVisible();

    for (let step = 0; step < 30; step += 1) {
        const matchingYear = yearOptions.filter({ hasText: String(year) }).first();
        if (await matchingYear.count()) {
            await matchingYear.click();
            break;
        }

        const visibleYears = (await yearOptions.allInnerTexts())
            .map((value) => Number.parseInt(value.trim(), 10))
            .filter(Number.isFinite)
            .sort((left, right) => left - right);

        const shouldGoBack = year < visibleYears[0];
        await overlay
            .locator(shouldGoBack ? 'button.p-datepicker-prev' : 'button.p-datepicker-next')
            .click();
    }

    const monthOptions = overlay.locator('.p-monthpicker-month');
    if (!await monthOptions.first().isVisible()) {
        await overlay.locator('button.p-datepicker-month').click();
        await expect(monthOptions.first()).toBeVisible();
    }
    await monthOptions.nth(monthIndex).click();

    const dayCell = overlay
        .locator('td:not(.p-datepicker-other-month):not(.p-disabled) > span')
        .filter({ hasText: new RegExp(`^${day}$`) })
        .first();
    await expect(dayCell).toBeVisible();
    await dayCell.click();

    await expect(input).toHaveValue(
        `${year}.${String(monthIndex + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`,
    );
}

test('guest edit limits first meal options to the conference first meal on the arrival day', async ({ page }) => {
    await seedAuthenticatedSession(page);
    await installGuestPageMocks(page);

    await page.goto('/#/guest');
    await page.waitForSelector('guest-component');
    await page.waitForLoadState('networkidle');

    const guestRow = page.locator('tr').filter({ hasText: 'Vendég Teszt' }).first();
    await expect(guestRow).toBeVisible();

    await guestRow.locator('button:has(.pi-pencil)').click();

    await expect(page.getByText('Vendég adatai')).toBeVisible();
    await expect(page.locator('input#dateOfArrival')).toHaveValue('2026.06.28');

    await expect
        .poll(async () => getFirstMealValues(page))
        .toEqual(['vacsora', 'nem kér étkezést']);

    const firstMealField = page.locator('.field').filter({
        has: page.locator('label[for="firstMeal"]'),
    });
    await firstMealField.locator('.p-dropdown').click();

    const visibleOptions = page.locator('.p-dropdown-panel:visible .p-dropdown-item');
    await expect(visibleOptions).toHaveCount(2);
    await expect(visibleOptions.filter({ hasText: 'Reggeli' })).toHaveCount(0);
    await expect(visibleOptions.filter({ hasText: 'Ebéd' })).toHaveCount(0);
    await expect(visibleOptions.filter({ hasText: 'Vacsora' })).toHaveCount(1);
    await expect(visibleOptions.filter({ hasText: 'Nem kér étkezést' })).toHaveCount(1);
});

test('guest edit limits last meal options to the conference last meal on the departure day', async ({ page }) => {
    await seedAuthenticatedSession(page);
    await installGuestPageMocks(page);

    await page.goto('/#/guest');
    await page.waitForSelector('guest-component');
    await page.waitForLoadState('networkidle');

    const guestRow = page.locator('tr').filter({ hasText: 'Vendég Teszt' }).first();
    await expect(guestRow).toBeVisible();

    await guestRow.locator('button:has(.pi-pencil)').click();

    await expect(page.getByText('Vendég adatai')).toBeVisible();
    await expect(page.locator('input#dateOfDeparture')).toHaveValue('2026.06.30');

    await expect
        .poll(async () => getLastMealValues(page))
        .toEqual(['reggeli', 'ebéd', 'vacsora', 'nem kér étkezést']);

    await pickDate(page, 'dateOfDeparture', '2026-07-03');

    await expect
        .poll(async () => getLastMealValues(page))
        .toEqual(['reggeli', 'ebéd', 'nem kér étkezést']);

    const lastMealField = page.locator('.field').filter({
        has: page.locator('label[for="lastMeal"]'),
    });
    await lastMealField.locator('.p-dropdown').click();

    const visibleOptions = page.locator('.p-dropdown-panel:visible .p-dropdown-item');
    await expect(visibleOptions).toHaveCount(3);
    await expect(visibleOptions.filter({ hasText: 'Reggeli' })).toHaveCount(1);
    await expect(visibleOptions.filter({ hasText: 'Ebéd' })).toHaveCount(1);
    await expect(visibleOptions.filter({ hasText: 'Vacsora' })).toHaveCount(0);
    await expect(visibleOptions.filter({ hasText: 'Nem kér étkezést' })).toHaveCount(1);
});

test('guest edit shows the id card upload immediately for adult guests who need accommodation', async ({ page }) => {
    await seedAuthenticatedSession(page);
    await installGuestPageMocks(page);

    await page.goto('/#/guest');
    await page.waitForSelector('guest-component');
    await page.waitForLoadState('networkidle');

    const guestRow = page.locator('tr').filter({ hasText: 'Vendég Teszt' }).first();
    await expect(guestRow).toBeVisible();

    await guestRow.locator('button:has(.pi-pencil)').click();

    await expect(page.getByText('Vendég adatai')).toBeVisible();
    await expect(page.locator('input#birthDate')).toHaveValue('1974.10.16');
    await expect(page.locator('app-roomtype-selector .p-dropdown-label')).toContainText('Maranatha');

    const idCardField = page.locator('.field').filter({
        has: page.locator('label[for="idCard"]'),
    });

    await expect(idCardField).toBeVisible();
    await expect(idCardField.locator('app-reactive-file-upload')).toBeVisible();
    await expect(idCardField.locator('input[type="file"]')).toHaveCount(1);
});
