import { test, expect } from "@playwright/test";
import { getUserToken, getAdminToken, uniqueEmail } from "./helpers.js";

test.describe("Users", () => {
  test("GET /users without a token returns 401", async ({ request }) => {
    const res = await request.get("/users");
    expect(res.status()).toBe(401);
  });

  test("a regular user cannot list users (403)", async ({ request }) => {
    const token = await getUserToken(request);

    const res = await request.get("/users", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.status()).toBe(403);
  });

  test("an admin can create, read, update and delete a user", async ({
    request,
  }) => {
    const adminToken = await getAdminToken(request);
    const email = uniqueEmail();

    const createRes = await request.post("/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        name: "Created By Admin",
        email,
        password: "12345678",
        role: "user",
      },
    });
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();
    expect(created.password).toBeUndefined();
    expect(created.passwordHash).toBeUndefined();

    const getRes = await request.get(`/users/${created._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(getRes.status()).toBe(200);

    const updateRes = await request.patch(`/users/${created._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { name: "Renamed User" },
    });
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.name).toBe("Renamed User");

    const deleteRes = await request.delete(`/users/${created._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(deleteRes.status()).toBe(200);

    const getAfterDeleteRes = await request.get(`/users/${created._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    expect(getAfterDeleteRes.status()).toBe(404);
  });

  test("creating a user without a password returns 400", async ({
    request,
  }) => {
    const adminToken = await getAdminToken(request);

    const res = await request.post("/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { name: "No Password", email: uniqueEmail(), role: "user" },
    });

    expect(res.status()).toBe(400);
  });

  test("updating a user cannot change the password field", async ({
    request,
  }) => {
    const adminToken = await getAdminToken(request);
    const email = uniqueEmail();

    const createRes = await request.post("/users", {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: {
        name: "Password Test",
        email,
        password: "12345678",
        role: "user",
      },
    });
    const created = await createRes.json();

    const updateRes = await request.patch(`/users/${created._id}`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { password: "newpassword123" },
    });

    expect(updateRes.status()).toBe(400);
    const body = await updateRes.json();
    expect(body.message).toBe("Validation failed");

    const loginRes = await request.post("/login", {
      data: { email, password: "12345678" },
    });
    expect(loginRes.status()).toBe(200);
  });
});
