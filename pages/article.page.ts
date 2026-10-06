import { expect, Page } from '@playwright/test';

export interface ArticleData {
  title: string;
  description: string;
  body: string;
}

export class ArticlePage {
  readonly page: Page;

  // Article editor
  readonly newArticleLink;
  readonly titleInput;
  readonly descriptionInput;
  readonly bodyInput;
  readonly tagsInput;
  readonly publishButton;

  // Article detail actions
  readonly editArticleButton;
  readonly deleteArticleButton;

  constructor(page: Page) {
    this.page = page;

    // Navigation
    this.newArticleLink = page.getByRole('link', {
      name: 'New Article',
    });

    // Editor fields
    this.titleInput = page.getByPlaceholder('Article Title');

    this.descriptionInput = page.getByPlaceholder(
      "What's this article about?"
    );

    this.bodyInput = page.getByPlaceholder(
      'Write your article (in markdown)'
    );

    this.tagsInput = page.getByPlaceholder('Enter tags');

    this.publishButton = page.getByRole('button', {
      name: 'Publish Article',
    });

    // Article detail actions
    // Conduit renders these as links, not buttons.
    // There can be duplicate Edit Article links, so use the first one.
    this.editArticleButton = page
      .getByRole('link', { name: /Edit Article/ })
      .first();

    this.deleteArticleButton = page
      .getByRole('button', { name: /Delete Article/ })
      .first();
  }

  async openEditor(): Promise<void> {
    await this.newArticleLink.click();

    await expect(this.titleInput).toBeVisible();
  }

  async createArticle(article: ArticleData): Promise<void> {
    await this.titleInput.fill(article.title);

    await this.descriptionInput.fill(article.description);

    await this.bodyInput.fill(article.body);

    await expect(this.publishButton).toBeEnabled();

    await this.publishButton.click();
  }

  async openEditMode(): Promise<void> {
    await expect(this.editArticleButton).toBeVisible();

    await this.editArticleButton.click();

    await expect(this.titleInput).toBeVisible();
  }

  async updateArticle(
    title: string,
    description: string,
    body: string
  ): Promise<void> {
    await this.titleInput.fill(title);

    await this.descriptionInput.fill(description);

    await this.bodyInput.fill(body);

    await expect(this.publishButton).toBeEnabled();

    await this.publishButton.click();
  }

  async deleteArticle(): Promise<void> {
    await expect(this.deleteArticleButton).toBeVisible();

    await this.deleteArticleButton.click();
  }
}