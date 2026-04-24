import { test, expect } from '@playwright/test';

test('TC003 - PUT Method: Update user', async ({ page }) => {
  let userId: string;

  // First, create a user to get userId (similar to TC002)
  const createResponse = await page.evaluate(async () => {
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

  // Extract userId from creation response
  userId = createResponse.data.id;
  console.log('User created with ID:', userId);

  // Step 1: PUT API: https://reqres.in/api/users + userId with updated data
  const apiResponse = await page.evaluate(async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'x-api-key': 'pro_45fae37c6d30578d900f4ef42ec30ed28c3001af070aefefbb5b31f6871a0221',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": "Lam",
        "job": "doctor"
      })
    });
    return {
      status: response.status,
      data: await response.json()
    };
  }, userId);

  console.log('Actual response status:', apiResponse.status);
  console.log('Response body:', apiResponse.data);
  
  // Step 2: Check response status - should be 200
  expect(apiResponse.status).toBe(200);
  console.log('Response status verified: 200');

  // Step 3: Check response data - should contain "doctor"
  const responseText = JSON.stringify(apiResponse.data);
  expect(responseText).toContain('doctor');
  console.log('Response data verified: Contains "doctor"');

  // Additional validations
  expect(apiResponse.data).toHaveProperty('name', 'Lam');
  expect(apiResponse.data).toHaveProperty('job', 'doctor');
  expect(apiResponse.data).toHaveProperty('updatedAt');
  
  console.log('PUT API test completed successfully');
  console.log('User updated - ID:', userId);
  console.log('Updated user data:', apiResponse.data);
});