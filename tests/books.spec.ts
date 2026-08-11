import { test, expect } from "@playwright/test";
import { getUserToken, getAdminToken } from "./helpers";

test.describe("Books", () => {
  test("GET /books without a token returns 401", async ({ request }) => {
    const res = await request.get("/books");
    expect(res.status()).toBe(401);
  });

  test("a regular user can list and read books", async ({ request }) => {
    const token = await getUserToken(request);

    const listRes = await request.get("/books", {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(listRes.status()).toBe(200);
  });

  test("a regular user cannot create a book (403)", async ({ request }) => {
    const token = await getUserToken(request);

    const res = await request.post("/books", {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "Forbidden Book", author: "Nobody", pageCount: 10 },
    });

    expect(res.status()).toBe(403);
  });

  test("an admin can create, update and delete a book", async ({ request }) => {
    const token = await getAdminToken(request);

    const createRes = await request.post("/books", {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "Playwright Book", author: "CI", pageCount: 42 },
    });
    expect(createRes.status()).toBe(201);
    const created = await createRes.json();

    const updateRes = await request.patch(`/books/${created._id}`, {
      headers: { Authorization: `Bearer ${token}` },
      data: { pageCount: 100 },
    });
    expect(updateRes.status()).toBe(200);
    const updated = await updateRes.json();
    expect(updated.pageCount).toBe(100);

    const deleteRes = await request.delete(`/books/${created._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(deleteRes.status()).toBe(200);

    const getRes = await request.get(`/books/${created._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(getRes.status()).toBe(404);
  });

  test("creating a book with a negative pageCount returns 400", async ({ request }) => {
    const token = await getAdminToken(request);

    const res = await request.post("/books", {
      headers: { Authorization: `Bearer ${token}` },
      data: { name: "Bad Book", author: "Nobody", pageCount: -5 },
    });

    expect(res.status()).toBe(400);
  });

  test("GET /books/:id with an invalid ObjectId returns 400, not 500", async ({ request }) => {
    const token = await getUserToken(request);

    const res = await request.get("/books/not-a-valid-id", {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(res.status()).toBe(400);
  });
});
