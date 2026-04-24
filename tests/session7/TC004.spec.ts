import { test, expect } from '@playwright/test';

test('TC004 - DELETE Method: Delete user', async ({ page }) => {
  let userId: string;

  // First, create a user to get userId for deletion
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
  console.log('User created with ID for deletion:', userId);

  // Step 1: DELETE API: https://reqres.in/api/users + userId
  const apiResponse = await page.evaluate(async (id) => {
    const response = await fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': 'pro_45fae37c6d30578d900f4ef42ec30ed28c3001af070aefefbb5b31f6871a0221'
      }
    });
    return {
      status: response.status,
      statusText: response.statusText
    };
  }, userId);

  console.log('Actual response status:', apiResponse.status);
  console.log('Response status text:', apiResponse.statusText);
  
  // Step 2: Check response status - should be 204
  expect(apiResponse.status).toBe(204);
  console.log('Response status verified: 204 (No Content)');
  
  console.log('DELETE API test completed successfully');
  console.log('User deleted - ID:', userId);
});