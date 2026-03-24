import { test, expect } from '@playwright/test';

test('TC001 - Verify Checkboxes', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.getByText('Checkboxes').click();

  await expect(page.locator('h3')).toHaveText('Checkboxes');
});