import { test, expect } from '@playwright/test';

test('TC003 - Verify Dropdown', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.getByText('Dropdown').click();

  await expect(page.locator('h3')).toHaveText('Dropdown List');

  const dropdown = page.locator('#dropdown');

  await dropdown.selectOption({ label: 'Option 2' });
  await expect(dropdown.locator('option:checked')).toHaveText('Option 2');

  await dropdown.selectOption({ index: 1 });
  await expect(dropdown.locator('option:checked')).toHaveText('Option 1');

  await dropdown.selectOption({ value: '2' });
  await expect(dropdown.locator('option:checked')).toHaveText('Option 2');
});