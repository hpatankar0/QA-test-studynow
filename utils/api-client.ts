import { APIRequestContext, expect } from '@playwright/test';

export const API_BASE_URL =
  'https://conduit-api.bondaracademy.com/api';

export interface TestUser {
  username: string;
  email: string;
  password: string;
  token?: string;
}

export interface Article {
  title: string;
  description: string;
  body: string;
}

export interface ArticleResponse {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
  };
}

/**
 * Registers a new Conduit user through the REST API.
 */
export async function registerUser(
  request: APIRequestContext,
  user: TestUser
): Promise<TestUser> {
  const response = await request.post(`${API_BASE_URL}/users`, {
    data: {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
      },
    },
  });

  const responseBody = await response.json();

  expect(response.status()).toBe(201);

  return {
    ...user,
    username: responseBody.user.username,
    email: responseBody.user.email,
    token: responseBody.user.token,
  };
}

/**
 * Logs an existing Conduit user in through the REST API.
 */
export async function loginUser(
  request: APIRequestContext,
  user: TestUser
): Promise<TestUser> {
  const response = await request.post(`${API_BASE_URL}/users/login`, {
    data: {
      user: {
        email: user.email,
        password: user.password,
      },
    },
  });

  const responseBody = await response.json();

  expect(response.status()).toBe(200);

  return {
    ...user,
    username: responseBody.user.username,
    token: responseBody.user.token,
  };
}

/**
 * Creates an article using an authenticated user.
 */
export async function createArticle(
  request: APIRequestContext,
  token: string,
  article: Article
): Promise<ArticleResponse> {
  const response = await request.post(`${API_BASE_URL}/articles`, {
    headers: {
      Authorization: `Token ${token}`,
    },
    data: {
      article,
    },
  });

  const responseBody = await response.json();

  expect(response.status()).toBe(201);

  return responseBody;
}

/**
 * Retrieves an article by slug.
 */
export async function getArticle(
  request: APIRequestContext,
  slug: string,
  expectedStatus = 200
): Promise<ArticleResponse | null> {
  const response = await request.get(
    `${API_BASE_URL}/articles/${slug}`
  );

  const responseBody =
    response.status() === 204 ? null : await response.json();


  expect(response.status()).toBe(expectedStatus);

  if (expectedStatus === 404) {
    return null;
  }

  return responseBody as ArticleResponse;
}

/**
 * Updates an existing article.
 */
export async function updateArticle(
  request: APIRequestContext,
  token: string,
  slug: string,
  article: Partial<Article>
): Promise<ArticleResponse> {
  const response = await request.put(
    `${API_BASE_URL}/articles/${slug}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
      data: {
        article,
      },
    }
  );

  const responseBody = await response.json();


  expect(response.status()).toBe(200);

  return responseBody;
}

/**
 * Deletes an article.
 */
export async function deleteArticle(
  request: APIRequestContext,
  token: string,
  slug: string
): Promise<void> {
  const response = await request.delete(
    `${API_BASE_URL}/articles/${slug}`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );


  expect(response.status()).toBe(204);
}