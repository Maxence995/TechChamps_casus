import { Page, Locator } from '@playwright/test';

export async function fillInputField(page: Page, locator: Locator, value: string) {
    await locator.fill(value);
}

export async function clickButton(page: Page, locator: Locator) {
    await locator.click();
}