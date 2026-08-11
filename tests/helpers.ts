import type { APIRequestContext } from "@playwright/test";

export const uniqueEmail = () =>
  `test.${Date.now()}.${Math.random().toString(36).slice(2)}@test.com`;

/** Реєструє нового звичайного юзера і повертає його токен. */
export const getUserToken = async (request: APIRequestContext): Promise<string> => {
  const email = uniqueEmail();
  const password = "12345678";

  await request.post("/signup", { data: { name: "Regular User", email, password } });
  const res = await request.post("/login", { data: { email, password } });
  const body = await res.json();

  return body.token as string;
};

/**
 * Логінить адміна, чиї креденшли задані через ADMIN_EMAIL / ADMIN_PASSWORD
 * (ті самі значення, якими ти запускав `npm run seed`).
 */
export const getAdminToken = async (request: APIRequestContext): Promise<string> => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      "Set ADMIN_EMAIL and ADMIN_PASSWORD env vars (same as in your .env / npm run seed) before running tests"
    );
  }

  const res = await request.post("/login", { data: { email, password } });
  const body = await res.json();

  if (!body.token) {
    throw new Error(`Admin login failed: ${JSON.stringify(body)}`);
  }

  return body.token as string;
};
