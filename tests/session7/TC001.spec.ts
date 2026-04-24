import { test, expect } from '@playwright/test';

test('TC001 - Get Method: Get information of user 2', async ({ page }) => {
  // Use browser's fetch API with required x-api-key header
  // Step 1: Get API: https://reqres.in/api/users/2
  const apiResponse = await page.evaluate(async () => {
    const response = await fetch('https://reqres.in/api/users/2', {
      headers: {
        'x-api-key': 'pro_45fae37c6d30578d900f4ef42ec30ed28c3001af070aefefbb5b31f6871a0221',
        'Content-Type': 'application/json'
      }
    });
    return {
      status: response.status,
      data: await response.json()
    };
  });

  console.log('Actual response status:', apiResponse.status);
  console.log('Response body:', apiResponse.data);
  
  // Step 2: Check response status - should be 200
  expect(apiResponse.status).toBe(200);
  console.log('Response status verified: 200');

  // Step 3: Check response data - should contain "Janet"
  const responseText = JSON.stringify(apiResponse.data);
  expect(responseText).toContain('Janet');
  console.log('Response data verified: Contains "Janet"');

  // Additional validation - verify the structure and specific user data
  expect(apiResponse.data).toHaveProperty('data');
  expect(apiResponse.data.data).toHaveProperty('id', 2);
  expect(apiResponse.data.data).toHaveProperty('first_name', 'Janet');
  
  console.log('API test completed successfully');
  console.log('User data retrieved:', apiResponse.data.data);
});