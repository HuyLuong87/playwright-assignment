import { test, expect } from '@playwright/test';

test('TC001 - Verify sort by price', async ({ page }) => {
  // Login to SauceDemo
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Validate the "Products" title is visible
  await expect(page.locator('.title')).toHaveText('Products');

  // Select sort by price (low to high)
  await page.selectOption('.product_sort_container', 'lohi');

  // Validate the sort works correctly
  const priceElements = page.locator('.inventory_item_price');
  const prices = await priceElements.allTextContents();
  const priceNumbers = prices.map(price => parseFloat(price.replace('$', '')));
  const sortedPrices = [...priceNumbers].sort((a, b) => a - b);

  // Check if sorted and log messages
  let isSorted = true;
  for (let i = 0; i < priceNumbers.length - 1; i++) {
    if (priceNumbers[i] > priceNumbers[i + 1]) {
      console.log(`There is an issue with Sort by low to high at item ${i + 1}: $${priceNumbers[i]} should be after $${priceNumbers[i + 1]}`);
      isSorted = false;
      break;
    }
  }
  if (isSorted) {
    console.log('All product prices are sorted by low to high');
  }

  expect(isSorted).toBe(true);
});