import { Article, TestUser } from './api-client';

export function createUniqueUser(): TestUser {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 100000);

  const id = `${timestamp}${random}`.slice(-15);

  return {
    username: `qa${id}`.slice(0, 20),
    email: `qa${id}@example.com`,
    password: 'Test@12345',
  };
}

export function createTestArticle(): Article {
  const id = `${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  return {
    title: `QA Automation Article ${id}`,
    description: `Automated test article ${id}`,
    body: `This article was created by the Playwright automation framework. Test ID: ${id}`,
  };
}