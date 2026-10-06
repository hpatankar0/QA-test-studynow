import { test, expect } from '../../fixtures/test.fixture';
import { ArticlePage } from '../../pages/article.page';
import { LoginPage } from '../../pages/login.page';
import { createTestArticle } from '../../utils/test-data';

test.describe('Article Lifecycle E2E', () => {
  test('should create, edit, verify and delete an article', async ({
    page,
    testUser,
  }) => {
    // Sign in through the UI.
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      testUser.email,
      testUser.password
    );

    // Create the article through the UI.
    const articlePage = new ArticlePage(page);

    const article = createTestArticle();

    await articlePage.openEditor();

    await articlePage.createArticle(article);

    // Verify article was created.
    await expect(page).toHaveURL(/\/article\/.+/);

    await expect(
      page.getByRole('heading', {
        name: article.title,
      })
    ).toBeVisible();

    // Edit the article.
    const updatedTitle = `${article.title} Updated`;

    const updatedDescription =
      `${article.description} Updated`;

    const updatedBody =
      `${article.body} This content was updated through the UI.`;

    await articlePage.openEditMode();

    await articlePage.updateArticle(
      updatedTitle,
      updatedDescription,
      updatedBody
    );

    // Verify updated article.
    await expect(page).toHaveURL(/\/article\/.+/);

    await expect(
      page.getByRole('heading', {
        name: updatedTitle,
      })
    ).toBeVisible();

    await expect(
      page.getByText(updatedBody)
    ).toBeVisible();

    // Delete the article.
    await articlePage.deleteArticle();

    // Verify the article was deleted.
    await expect(page).toHaveURL(/\/$/);

    await expect(
      page.getByRole('heading', {
        name: updatedTitle,
      })
    ).not.toBeVisible();
  });
});