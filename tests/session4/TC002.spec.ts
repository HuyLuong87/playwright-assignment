import { test, expect } from '@playwright/test';

test('TC002 - Verify user can order product', async ({ page }) => {
  // Login to SauceDemo
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // 1. Go to https://www.saucedemo.com/inventory.html page
  await page.goto('https://www.saucedemo.com/inventory.html');

  // Validate the "Products" is visible
  await expect(page.locator('.title')).toHaveText('Products');

  // 2. On the first item click "Add to cart"
  const firstItem = page.locator('.inventory_item').first();
  const addButton = firstItem.locator('.btn_inventory');
  await addButton.click();

  // The button text changed into "Remove"
  await expect(addButton).toHaveText('Remove');

  // and there is number '1' on the cart
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // 3. Click on the cart
  await page.locator('.shopping_cart_link').click();

  // validate pre-added item is visible
  await expect(page.locator('.cart_item')).toBeVisible();

  // 4. Click checkout, input all required fields
  await page.locator('#checkout').click();

  // Input first name, last name, zip code
  await page.fill('#first-name', 'John');
  await page.fill('#last-name', 'Doe');
  await page.fill('#postal-code', '12345');

  // validate the corresponding fields display input text
  await expect(page.locator('#first-name')).toHaveValue('John');
  await expect(page.locator('#last-name')).toHaveValue('Doe');
  await expect(page.locator('#postal-code')).toHaveValue('12345');

  // 5. Click Continue
  await page.locator('#continue').click();

  // validate checkout page has item added earlier
  await expect(page.locator('.cart_item')).toBeVisible();

  // 6. Click Finish
  await page.locator('#finish').click();

  // validate thank you msg: "Thank you for your order!" and "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  await expect(page.locator('.complete-text')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});