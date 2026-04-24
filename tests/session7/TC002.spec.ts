import { test, expect } from '@playwright/test';

test('TC002 - POST Method: Create new user', async ({ page }) => {
  let userId: string;

  // Step 1: POST API: https://reqres.in/api/users with data
  const apiResponse = await page.evaluate(async () => {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'x-api-key': 'pro_45fae37c6d30578d900f4ef42ec30ed28c3001af070aefefbb5b31f6871a0221',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "Lam",
        "job": "teacher"
      })
    });
    return {
      status: response.status,
      data: await response.json()
    };
  });

  console.log('Actual response status:', apiResponse.status);
  console.log('Response body:', apiResponse.data);
  
  // Step 2: Check response status - should be 201
  expect(apiResponse.status).toBe(201);
  console.log('Response status verified: 201');

  // Step 3: Check response data - should contain "teacher"
  const responseText = JSON.stringify(apiResponse.data);
  expect(responseText).toContain('teacher');
  console.log('Response data verified: Contains "teacher"');

  // Step 4: Get id from response data
  expect(apiResponse.data).toHaveProperty('id');
  
  // Step 5: Store id into variable: userId
  userId = apiResponse.data.id;
  console.log('User ID extracted and stored:', userId);

  // Additional validations
  expect(apiResponse.data).toHaveProperty('name', 'Lam');
  expect(apiResponse.data).toHaveProperty('job', 'teacher');
  expect(apiResponse.data).toHaveProperty('createdAt');
  
  console.log('POST API test completed successfully');
  console.log('New user created with ID:', userId);
  console.log('User data:', apiResponse.data);
});