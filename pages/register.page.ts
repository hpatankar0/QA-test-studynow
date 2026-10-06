import { expect, Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;

  readonly usernameInput;
  readonly emailInput;
  readonly passwordInput;
  readonly signUpButton;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.signUpButton = page.getByRole('button', {
      name: 'Sign up',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('/register');
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await expect(this.signUpButton).toBeEnabled();

    await this.signUpButton.click();
  }
}