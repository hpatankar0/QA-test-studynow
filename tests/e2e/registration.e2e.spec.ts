import { test, expect } from '@playwright/test';
import { RegisterPage } from '../../pages/register.page';
import { createUniqueUser } from '../../utils/test-data';

test.describe('Registration E2E', () => {
  test('should register a new user successfully', async ({ page }) => {
    const registerPage = new RegisterPage(page);
    const user = createUniqueUser();

    await registerPage.goto();

    await registerPage.register(
      user.username,
      user.email,
      user.password
    );

    await expect(page).toHaveURL(/\/$/);

    await expect(
      page.getByRole('link', {
        name: user.username,
      })
    ).toBeVisible();
  });
});