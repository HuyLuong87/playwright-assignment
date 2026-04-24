import { test } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('TC001 - Verify error message appear when login with invalid user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  // 1. Go to https://www.saucedemo.com/inventory.html page
  await loginPage.goto('https://www.saucedemo.com/inventory.html');

  // 2. Input username field with: locked_out_user
  await loginPage.enterUsername('locked_out_user');

  // 3. Input password field with: secret_sauce
  await loginPage.enterPassword('secret_sauce');

  // 4. Click login
  await loginPage.clickLogin();

  // Verify that the error message is displayed
  await loginPage.assertErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});
