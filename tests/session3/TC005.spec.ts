import { test, expect } from '@playwright/test';
import path from 'path';

test('TC005 - Verify Upload file', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  await page.getByRole('link', { name: 'File Upload' }).click();

  await expect(page.locator('h3')).toHaveText('File Uploader');

  const filePath = path.join(__dirname, 'test-data', 'sample005.txt');

  await page.locator('#file-upload').setInputFiles(filePath);
  await page.getByRole('button', { name: 'Upload' }).click();

  await expect(page.locator('#uploaded-files')).toHaveText('sample005.txt');
});