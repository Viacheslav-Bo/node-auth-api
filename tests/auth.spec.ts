import { test, expect } from "@playwright/test";

// Кожен запуск генерує унікальний email, щоб тести можна було повторювати
// без ручного чищення бази між прогонами.
const uniqueEmail = () => `test.${Date.now()}.${Math.random().toString(36).slice(2)}@test.com`;

test.describe("Auth", () => {
  test("signup creates a user with default role 'user'", async ({ request }) => {
    const email = uniqueEmail();

    const res = await request.post("/signup", {
      data: { name: "Test User", email, password: "12345678" },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();

    expect(body.user.email).toBe(email);
    expect(body.user.role).toBe("user");
    // пароль/хеш не повинен потрапляти в відповідь
    expect(body.user.password).toBeUndefined();
    expect(body.user.passwordHash).toBeUndefined();
  });

  test("signup ignores a role passed in the request body (mass assignment)", async ({ request }) => {
    const email = uniqueEmail();

    const res = await request.post("/signup", {
      data: { name: "Sneaky User", email, password: "12345678", role: "admin" },
    });

    expect(res.status()).toBe(201);
    const body = await res.json();

    expect(body.user.role).toBe("user");
  });

  test("signup rejects a duplicate email with 409", async ({ request }) => {
    const email = uniqueEmail();

    await request.post("/signup", {
      data: { name: "First", email, password: "12345678" },
    });

    const res = await request.post("/signup", {
      data: { name: "Second", email, password: "87654321" },
    });

    expect(res.status()).toBe(409);
  });

  test("signup rejects a password shorter than 8 characters", async ({ request }) => {
    const res = await request.post("/signup", {
      data: { name: "Short Pass", email: uniqueEmail(), password: "123" },
    });

    expect(res.status()).toBe(400);
  });

  test("login returns a token for correct credentials", async ({ request }) => {
    const email = uniqueEmail();
    const password = "12345678";

    await request.post("/signup", { data: { name: "Login Test", email, password } });

    const res = await request.post("/login", { data: { email, password } });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.token).toBe("string");
  });

  test("login with wrong password and unknown email return the same 401 message", async ({ request }) => {
    const email = uniqueEmail();
    await request.post("/signup", { data: { name: "Wrong Pass", email, password: "12345678" } });

    const wrongPasswordRes = await request.post("/login", {
      data: { email, password: "wrongpassword" },
    });
    const unknownEmailRes = await request.post("/login", {
      data: { email: "nobody-at-all@test.com", password: "12345678" },
    });

    expect(wrongPasswordRes.status()).toBe(401);
    expect(unknownEmailRes.status()).toBe(401);

    const wrongPasswordBody = await wrongPasswordRes.json();
    const unknownEmailBody = await unknownEmailRes.json();

    // Немає user enumeration: повідомлення однакові для обох випадків
    expect(wrongPasswordBody.message).toBe(unknownEmailBody.message);
  });
});
