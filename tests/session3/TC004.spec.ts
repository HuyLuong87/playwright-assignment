import { test, expect } from '@playwright/test';

test('TC004 - Verify Frames', async ({ page }) => {
  await page.goto('https://www.globalsqa.com/demo-site/frames-and-windows/');

  await expect(page.locator('h1')).toContainText('Frames And Windows');

  await page.getByRole('tab', { name: 'iFrame' }).click();

  const frame = page.frameLocator('iframe[name="globalSqa"]');

  await frame.getByRole('textbox', { name: 'Search...' }).click();
  await frame.getByRole('textbox', { name: 'Search...' }).fill('Playwright');
  await frame.getByRole('button').click();

  await expect(frame.locator('body')).toContainText(
    'Sorry, no posts matched your criteria.'
  );
});