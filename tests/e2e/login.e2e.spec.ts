import { expect } from '@playwright/test';
import { test } from '../../fixtures/test.fixture';
import { LoginPage } from '../../pages/login.page';

test.describe('Login E2E', () => {
  test('should login with valid credentials', async ({
    page,
    testUser,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      testUser.email,
      testUser.password
    );

    await expect(page).toHaveURL(/\/$/);

    await expect(
      page.getByRole('link', {
        name: testUser.username,
      })
    ).toBeVisible();
  });
});