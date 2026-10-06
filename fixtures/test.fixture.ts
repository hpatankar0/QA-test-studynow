import { test as base, expect } from '@playwright/test';
import { registerUser, TestUser } from '../utils/api-client';
import { createUniqueUser } from '../utils/test-data';

type TestFixtures = {
  testUser: TestUser;
};

export const test = base.extend<TestFixtures>({
  testUser: async ({ request }, use) => {
    const user = createUniqueUser();

    await registerUser(request, user);

    await use(user);
  },
});

export { expect };