import { expect, test, type Locator, type Page, type Route } from '@playwright/test';

const FORM_SLUG = 'e2e-conference-form';
const CONFERENCE_NAME = 'E2E Konferencia';

type SubmittedRequest = {
    bodyText: string;
    guestPayload: Record<string, unknown> | null;
};

function buildConferenceResponse() {
    return {
        rows: [
            {
                id: 987,
                name: CONFERENCE_NAME,
                formUrl: FORM_SLUG,
                beginDate: '2026-07-10',
                endDate: '2026-07-12',
                firstMeal: 'reggeli',
                lastMeal: 'vacsora',
                registrationEndDate: '2099-12-31',
                guestEditEndDate: '2099-12-31',
                paymentMethodIds: [3],
                questions: [],
                formFieldInfos: [],
                acceptanceCriteriaUrl: null,
            },
        ],
    };
}

function buildDietResponse() {
    return {
        rows: [
            { id: 1, name: 'normál', color: 'green' },
            { id: 2, name: 'gluténmentes', color: 'orange' },
            { id: 3, name: 'nem kér étkezést', color: 'gray' },
        ],
        count: 3,
    };
}

async function installConferenceFormMocks(page: Page): Promise<SubmittedRequest> {
    const submittedRequest: SubmittedRequest = {
        bodyText: '',
        guestPayload: null,
    };

    await page.route(`**/api/conference/form/${FORM_SLUG}`, async (route: Route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(buildConferenceResponse()),
        });
    });

    await page.route('**/api/diet/get/**', async (route: Route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(buildDietResponse()),
        });
    });

    await page.route('**/api/guest/create/**', async (route: Route) => {
        const request = route.request();
        const bodyBuffer = request.postDataBuffer();
        submittedRequest.bodyText = bodyBuffer ? bodyBuffer.toString('utf8') : '';
        submittedRequest.guestPayload = extractMultipartJsonField(
            submittedRequest.bodyText,
            'guest',
        );

        const guestPayload = submittedRequest.guestPayload ?? {};

        await route.fulfill({
            status: 201,
            contentType: 'application/json',
            body: JSON.stringify({
                guest: {
                    id: 12345,
                    lastName: guestPayload.lastName ?? 'Teszt',
                    firstName: guestPayload.firstName ?? 'Elek',
                },
                email: {
                    status: 'queued',
                },
            }),
        });
    });

    return submittedRequest;
}

function extractMultipartJsonField(
    bodyText: string,
    fieldName: string,
): Record<string, unknown> | null {
    const escapedFieldName = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const match = bodyText.match(
        new RegExp(`name="${escapedFieldName}"\\r\\n\\r\\n([\\s\\S]*?)\\r\\n--`, 'm'),
    );

    if (!match?.[1]) {
        return null;
    }

    try {
        return JSON.parse(match[1]);
    } catch {
        return null;
    }
}

async function gotoConferenceForm(page: Page): Promise<void> {
    await page.goto(`/#/conference-form/${FORM_SLUG}`);
    await page.waitForSelector('conference-form');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => {
        const host = document.querySelector('conference-form');
        const cmp =
            host && (window as any).ng && (window as any).ng.getComponent
                ? (window as any).ng.getComponent(host)
                : null;

        if (!cmp) {
            return;
        }

        cmp.translate.use('hu');
        cmp.currentLang = 'hu';
        cmp.cdRef.detectChanges();
    });
}

async function selectDropdownOption(
    page: Page,
    container: Locator,
    optionText: string,
    exact = false,
): Promise<void> {
    await container.locator('.p-dropdown').click();
    const option = pageOption(page, optionText, exact);
    await expect(option).toBeVisible();
    await option.click();
}

function pageOption(page: Page, optionText: string, exact: boolean): Locator {
    return page.locator('.p-dropdown-item').filter({
        has: exact
            ? page.getByText(optionText, { exact: true })
            : page.getByText(optionText),
    }).first();
}

async function pickDate(page: Page, inputId: string, isoDate: string): Promise<void> {
    const input = page.locator(`input#${inputId}`);
    const [yearText, monthText, dayText] = isoDate.split('-');
    const year = Number.parseInt(yearText ?? '', 10);
    const monthIndex = Number.parseInt(monthText ?? '', 10) - 1;
    const day = Number.parseInt(dayText ?? '', 10);

    if (!Number.isFinite(year) || !Number.isFinite(monthIndex) || !Number.isFinite(day)) {
        throw new Error(`Invalid ISO date: ${isoDate}`);
    }

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

        if (!visibleYears.length) {
            throw new Error(`No visible years in datepicker for ${inputId}`);
        }

        const shouldGoBack = year < visibleYears[0];
        await overlay.locator(
            shouldGoBack ? 'button.p-datepicker-prev' : 'button.p-datepicker-next',
        ).click();
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

test.describe('conference form registration flow', () => {
    test('shows inline errors and focuses the first invalid field on invalid submit', async ({ page }) => {
        await installConferenceFormMocks(page);
        await gotoConferenceForm(page);

        await page.locator('button[type="submit"]').click();

        await expect(
            page.getByText('Kérjük, töltse ki az alábbi kötelező mezőket:'),
        ).toBeVisible();
        await expect(page.locator('#lastName')).toBeFocused();
        await expect(page.locator('#lastName')).toHaveClass(/ng-invalid/);
    });

    test('scrolls to a clicked field from the validation summary', async ({ page }) => {
        await installConferenceFormMocks(page);
        await gotoConferenceForm(page);

        await page.locator('button[type="submit"]').click();
        await page.waitForTimeout(400);

        const beforeScrollY = await page.evaluate(() => window.scrollY);
        const privacyField = page.locator('[data-field-key="privacy"]');

        await page
            .locator('.conference-form-error-summary__link')
            .filter({ hasText: 'Adatvédelem' })
            .first()
            .click();

        await page.waitForTimeout(800);

        const afterScrollY = await page.evaluate(() => window.scrollY);
        const privacyBox = await privacyField.boundingBox();

        expect(afterScrollY).toBeGreaterThan(beforeScrollY + 300);
        expect(privacyBox).not.toBeNull();
        expect((privacyBox?.y ?? 9999)).toBeLessThan(260);
    });

    test('submits a full registration with dropdowns, room mate draft and id card upload', async ({ page }) => {
        const submittedRequest = await installConferenceFormMocks(page);
        await gotoConferenceForm(page);

        await page.locator('#lastName').fill('Teszt');
        await page.locator('#firstName').fill('Elek');
        await page.locator('label[for="gender1"]').click();
        await pickDate(page, 'birthDate', '1988-06-15');
        await page.locator('p-inputmask#zipCode input').fill('1234');
        await page.locator('#email').fill('teszt@example.com');
        await page.locator('#telephone').fill('+36123456789');
        await pickDate(page, 'dateOfArrival', '2026-07-10');
        await pickDate(page, 'dateOfDeparture', '2026-07-12');

        await selectDropdownOption(
            page,
            page.locator('app-meal-selector[controlname="firstMeal"]'),
            'Ebéd',
            true,
        );
        await selectDropdownOption(
            page,
            page.locator('app-diet-selector'),
            'normál',
            true,
        );
        await selectDropdownOption(
            page,
            page.locator('app-meal-selector[controlname="lastMeal"]'),
            'Vacsora',
            true,
        );

        await page.locator('app-roomtype-selector .p-dropdown').click();
        const roomTypeOption = page
            .locator('.p-dropdown-item')
            .filter({ hasText: 'Kastély szállás' })
            .filter({ hasText: '4 ágyas szoba' })
            .first();
        await expect(roomTypeOption).toBeVisible();
        await roomTypeOption.click();

        await page.locator('app-reactive-file-upload input[type="file"]').setInputFiles({
            name: 'idcard.pdf',
            mimeType: 'application/pdf',
            buffer: Buffer.from('%PDF-1.4\n% E2E id card mock\n'),
        });

        await page.locator('p-chips input').fill(' Alice ; Bob ');

        await selectDropdownOption(
            page,
            page.locator('app-payment-selector'),
            'Készpénz',
            true,
        );

        await page.locator('p-checkbox .p-checkbox-box').click();
        await page.locator('button[type="submit"]').click();

        await expect(
            page.locator('#home').getByText('Sikeresen regisztrált!'),
        ).toBeVisible();
        await expect(
            page.getByRole('button', { name: 'Új vendéget regisztrálok' }),
        ).toBeVisible();

        expect(submittedRequest.bodyText).toContain('name="idcard"');
        expect(submittedRequest.bodyText).toContain('filename="idcard.pdf"');
        expect(submittedRequest.guestPayload).toMatchObject({
            lastName: 'Teszt',
            firstName: 'Elek',
            gender: '1',
            birthDate: '1988-06-15',
            country: 'Hungary',
            nationality: 'HU',
            zipCode: '1234',
            email: 'teszt@example.com',
            telephone: '+36123456789',
            dateOfArrival: '2026-07-10',
            firstMeal: 'ebéd',
            diet: 'normál',
            dateOfDeparture: '2026-07-12',
            lastMeal: 'vacsora',
            roomType: 'Kastély szállás 4 ágyas szoba',
            roomMate: 'Alice, Bob',
            payment: 3,
            privacy: true,
            conferenceid: 987,
            conferenceName: CONFERENCE_NAME,
        });
    });
});
