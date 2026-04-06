import { test, expect } from '@playwright/test';

test('TC008 - Verify prompt dialog', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  await expect(page.getByRole('heading', { name: /automation testing practice/i })).toBeVisible();

  page.once('dialog', async dialog => {
    await expect(dialog.message()).toBe('Please enter your name:');
    await expect(dialog.defaultValue()).toBe('Harry Potter');
    await dialog.accept('Huy');
  });

  await page.getByRole('button', { name: 'Prompt' }).click();

  await expect(page.locator('#demo')).toHaveText('Hello Huy! How are you today?');
});