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

    // New Article navigation
    this.newArticleLink = page.getByRole('link', {
      name: 'New Article',
    });

    // Article editor fields
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
    // Use visible text because this is how the controls
    // are rendered by the Conduit application.
    this.editArticleButton = page.getByText('Edit Article', {
      exact: true,
    });

    this.deleteArticleButton = page.getByText('Delete Article', {
      exact: true,
    });
  }

  async openEditor(): Promise<void> {
    await this.newArticleLink.click();

    await expect(this.titleInput).toBeVisible();
  }

  async createArticle(article: ArticleData): Promise<void> {
    await this.titleInput.fill(article.title);

    await this.descriptionInput.fill(
      article.description
    );

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