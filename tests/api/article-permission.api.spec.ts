import { test, expect } from '@playwright/test';
import {
  registerUser,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} from '../../utils/api-client';
import {
  createUniqueUser,
  createTestArticle,
} from '../../utils/test-data';

test.describe('Article Authorization API', () => {
  test('User B should not edit or delete User A article', async ({
    request,
  }) => {
    // Create User A
    const userA = await registerUser(
      request,
      createUniqueUser()
    );

    expect(userA.token).toBeTruthy();

    // Create User B
    const userB = await registerUser(
      request,
      createUniqueUser()
    );

    expect(userB.token).toBeTruthy();

    // User A creates an article
    const article = createTestArticle();

    const createdArticle = await createArticle(
      request,
      userA.token!,
      article
    );

    const originalSlug = createdArticle.article.slug;

    expect(createdArticle.article.author.username).toBe(
      userA.username
    );

    // User B attempts to update User A's article.
    const updateResponse = await request.put(
      `https://conduit-api.bondaracademy.com/api/articles/${originalSlug}`,
      {
        headers: {
          Authorization: `Token ${userB.token}`,
        },
        data: {
          article: {
            title: `${article.title} - Unauthorized Update`,
          },
        },
      }
    );

    expect([401, 403]).toContain(updateResponse.status());

    // Verify User A's article was not modified.
    const articleAfterUpdateAttempt = await getArticle(
      request,
      originalSlug
    );

    expect(articleAfterUpdateAttempt).not.toBeNull();
    expect(articleAfterUpdateAttempt!.article.title).toBe(
      article.title
    );
    expect(articleAfterUpdateAttempt!.article.author.username).toBe(
      userA.username
    );

    // User B attempts to delete User A's article.
    const deleteResponse = await request.delete(
      `https://conduit-api.bondaracademy.com/api/articles/${originalSlug}`,
      {
        headers: {
          Authorization: `Token ${userB.token}`,
        },
      }
    );

    expect([401, 403]).toContain(deleteResponse.status());

    // Verify User A's article still exists.
    const articleAfterDeleteAttempt = await getArticle(
      request,
      originalSlug
    );

    expect(articleAfterDeleteAttempt).not.toBeNull();
    expect(articleAfterDeleteAttempt!.article.title).toBe(
      article.title
    );
    expect(articleAfterDeleteAttempt!.article.author.username).toBe(
      userA.username
    );

    // Cleanup: User A deletes their own article.
    await deleteArticle(
      request,
      userA.token!,
      originalSlug
    );

    const deletedArticle = await getArticle(
      request,
      originalSlug,
      404
    );

    expect(deletedArticle).toBeNull();
  });
});