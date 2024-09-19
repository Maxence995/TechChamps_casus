import { Page } from '@playwright/test';

export const BASE_URL = 'https://test-rpg.vercel.app';

export async function navigateTo(page: Page, path: string) {
    await page.goto(`${BASE_URL}${path}`);
}