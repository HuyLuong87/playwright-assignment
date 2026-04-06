import { test, expect } from '@playwright/test';

test('TC006 - Verify Dynamically Loaded Page Elements', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.getByRole('link', { name: 'Dynamic Loading' }).click();
  await expect(page.locator('h3')).toHaveText('Dynamically Loaded Page Elements');

  await page.getByRole('link', { name: 'Example 1: Element on page that is hidden' }).click();
  await expect(
    page.getByRole('heading', {
      level: 4,
      name: 'Example 1: Element on page that is hidden',
    })
  ).toBeVisible();

  await page.getByRole('button', { name: 'Start' }).click();

  await expect(page.locator('#finish h4')).toHaveText('Hello World!', { timeout: 10000 });
});