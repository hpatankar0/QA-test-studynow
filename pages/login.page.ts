import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly emailInput;
  readonly passwordInput;
  readonly signInButton;

  constructor(page: Page) {
    this.page = page;

    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signInButton = page.getByRole('button', {
      name: 'Sign in',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/login');
  }

  async login(
    email: string,
    password: string
  ): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await expect(this.signInButton).toBeEnabled();

    await this.signInButton.click();
  }
}