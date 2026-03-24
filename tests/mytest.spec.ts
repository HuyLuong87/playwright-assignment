import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/');
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  await page.locator('#carouselExampleIndicators').getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Home (current)' }).click();
  await page.getByRole('link', { name: 'Sony vaio i5' }).click();
});