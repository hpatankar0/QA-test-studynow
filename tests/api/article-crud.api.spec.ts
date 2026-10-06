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

test.describe('Article CRUD API', () => {
  test('should create, retrieve, update and delete an article', async ({
    request,
  }) => {
    // Arrange: create an isolated user for this test
    const user = createUniqueUser();

    const authenticatedUser = await registerUser(
      request,
      user
    );

    expect(authenticatedUser.token).toBeTruthy();

    // Create article
    const article = createTestArticle();

    const createdArticle = await createArticle(
      request,
      authenticatedUser.token!,
      article
    );

    expect(createdArticle.article.title).toBe(article.title);
    expect(createdArticle.article.description).toBe(
      article.description
    );
    expect(createdArticle.article.body).toBe(article.body);
    expect(createdArticle.article.slug).toBeTruthy();
    expect(createdArticle.article.author.username).toBe(
      authenticatedUser.username
    );

    const originalSlug = createdArticle.article.slug;

    // Retrieve article
    const retrievedArticle = await getArticle(
      request,
      originalSlug
    );

    expect(retrievedArticle).not.toBeNull();
    expect(retrievedArticle!.article.title).toBe(
      article.title
    );
    expect(retrievedArticle!.article.slug).toBe(
      originalSlug
    );
    expect(retrievedArticle!.article.author.username).toBe(
      authenticatedUser.username
    );

    // Update article
    const updatedTitle = `${article.title} Updated`;

    const updatedArticle = await updateArticle(
      request,
      authenticatedUser.token!,
      originalSlug,
      {
        title: updatedTitle,
      }
    );

    expect(updatedArticle.article.title).toBe(
      updatedTitle
    );
    expect(updatedArticle.article.slug).toBeTruthy();

    // Conduit generates a new slug when the title changes.
    const updatedSlug = updatedArticle.article.slug;

    expect(updatedSlug).not.toBe(originalSlug);

    expect(updatedArticle.article.author.username).toBe(
      authenticatedUser.username
    );

    // Verify updated article
    const verifiedArticle = await getArticle(
      request,
      updatedSlug
    );

    expect(verifiedArticle).not.toBeNull();
    expect(verifiedArticle!.article.title).toBe(
      updatedTitle
    );
    expect(verifiedArticle!.article.slug).toBe(
      updatedSlug
    );
    expect(verifiedArticle!.article.author.username).toBe(
      authenticatedUser.username
    );

    // Delete article
    await deleteArticle(
      request,
      authenticatedUser.token!,
      updatedSlug
    );

    // Verify article was deleted
    const deletedArticle = await getArticle(
      request,
      updatedSlug,
      404
    );

    expect(deletedArticle).toBeNull();
  });
});