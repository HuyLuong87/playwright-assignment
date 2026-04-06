import { test, expect } from '@playwright/test';

test('TC007 - Verify input', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const nameInput = page.locator('#name');
  const addressTextarea = page.locator('#textarea');

  await expect(page.getByRole('heading', { name: /automation testing practice/i })).toBeVisible();

  await nameInput.fill('Huy Luong');
  await expect(nameInput).toHaveValue('Huy Luong');

  await addressTextarea.fill('Da Nang, Viet Nam');
  await expect(addressTextarea).toHaveValue('Da Nang, Viet Nam');

  await nameInput.clear();
  await expect(nameInput).toHaveValue('');

  await addressTextarea.clear();
  await expect(addressTextarea).toHaveValue('');
});