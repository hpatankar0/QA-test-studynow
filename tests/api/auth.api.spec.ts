import { test, expect } from '@playwright/test';
import { registerUser, loginUser } from '../../utils/api-client';
import { createUniqueUser } from '../../utils/test-data';

test.describe('Authentication API', () => {
  test('should register a new user', async ({ request }) => {
    const user = createUniqueUser();

    const registeredUser = await registerUser(request, user);

    expect(registeredUser.username).toBe(user.username);
    expect(registeredUser.email).toBe(user.email);
    expect(registeredUser.token).toBeTruthy();
  });

  test('should login with valid credentials', async ({ request }) => {
    const user = createUniqueUser();

    await registerUser(request, user);

    const authenticatedUser = await loginUser(request, user);

    expect(authenticatedUser.username).toBe(user.username);
    expect(authenticatedUser.token).toBeTruthy();
  });
});