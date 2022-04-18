import supertest from "supertest";
import { Types } from "mongoose";
import app from "../../../src/core/express";
import { setupTestDB } from "../utils/setupTest";
import { createAccount, login } from "../fixtures/accounts";

setupTestDB();

describe("api/accounts", function () {
  test("POST: / should create account successful", async function () {
    var data = {
      name: "Test Account Create",
      email: "test@mail.com",
      username: "testAccountCreate",
      password: "12345",
    };

    const request = supertest(app);
    const response = await request.post("/accounts").send(data).expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.username).toEqual(data.username);
  });

  test("POST: / should return 400 when email missing", async function () {
    var data = {
      name: "Test Account Create",
      username: "testAccountCreate",
      password: "12345",
    };

    const request = supertest(app);

    await request.post("/accounts").send(data).expect(400);
  });

  test("POST: / should return 400 when username missing", async function () {
    var data = {
      name: "Test Account Create",
      email: "test@mail.com",
      password: "12345",
    };

    const request = supertest(app);

    await request.post("/accounts").send(data).expect(400);
  });

  test("POST: / should return 400 when password missing", async function () {
    var data = {
      name: "Test Account Create",
      email: "test@mail.com",
      username: "testAccountCreate",
    };

    const request = supertest(app);

    await request.post("/accounts").send(data).expect(400);
  });

  test("POST: /token should login successfully", async function () {
    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);
    const response = await request
      .post("/accounts/token")
      .send({
        username: createdAccount.username,
        password: "12345",
      })
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.token).not.toBeNull();
  });

  test("POST: /token should return 400 when username missing", async function () {
    const request = supertest(app);

    await request
      .post("/accounts/token")
      .send({
        password: "12345",
      })
      .expect(400);
  });

  test("POST: /token should return 400 when password missing", async function () {
    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);

    await request
      .post("/accounts/token")
      .send({
        username: createdAccount.username,
      })
      .expect(400);
  });

  test("POST: /token should return 420 when login not existed", async function () {
    const request = supertest(app);

    await request
      .post("/accounts/token")
      .send({
        username: "notexisteduser",
        password: "12345",
      })
      .expect(420);
  });

  test("POST: /token should return 420 when login failed", async function () {
    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);

    await request
      .post("/accounts/token")
      .send({
        username: createdAccount.username,
        password: "wrongpassword",
      })
      .expect(420);
  });

  test("GET: / should return list of accounts", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create account
    await createAccount({});

    const request = supertest(app);
    const response = await request
      .get("/accounts")
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body).toHaveLength(8);
    expect(response.body[0].password).toBeUndefined();
  });

  test("GET: / should return list of accounts with filter name", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create account
    await createAccount({});

    const request = supertest(app);
    const response = await request
      .get("/accounts?name=account")
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body).toHaveLength(5);
    expect(response.body[0].password).toBeUndefined();
  });

  test("GET: / should return 401 when not login", async function () {
    const request = supertest(app);

    await request.get("/accounts").expect(401);
  });

  test("GET: /:accountId should return account by id", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);
    const response = await request
      .get(`/accounts/${createdAccount._id}`)
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(createdAccount.name);
    expect(response.body.password).toBeUndefined();
  });

  test("GET: /:accountId should return 401 when not login", async function () {
    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);

    await request.get(`/accounts/${createdAccount._id}`).expect(401);
  });

  test("PUT: /:accountId should update account successfully", async function () {
    // Login
    const adminAccountToken = await login("admin", "12345");

    // Create account
    const createdAccount = await createAccount({});

    var data = {
      name: "Test Account Update",
      email: "test@mail.com",
      username: "testAccountUpdate",
      password: "12345",
    };

    const request = supertest(app);
    const response = await request
      .put(`/accounts/${createdAccount._id}`)
      .set("Authorization", adminAccountToken.token)
      .send(data)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(data.name);
  });

  test("PUT: /:accountId should return 401 when not login", async function () {
    // Create account
    const createdAccount = await createAccount({});

    var data = {
      name: "Test Account Update",
      email: "test@mail.com",
      username: "testAccountUpdate",
      password: "12345",
    };

    const request = supertest(app);

    await request.put(`/accounts/${createdAccount._id}`).send(data).expect(401);
  });

  test("PUT: /:accountId should return 404 when accountId not existed", async function () {
    // Login
    const adminAccountToken = await login("admin", "12345");

    var data = {
      name: "Test Account Update",
      email: "test@mail.com",
      username: "testAccountUpdate",
      password: "12345",
    };

    const request = supertest(app);

    await request
      .put(`/accounts/${Types.ObjectId()}`)
      .set("Authorization", adminAccountToken.token)
      .send(data)
      .expect(404);
  });

  test("DELETE: /:accountId should delete account successfully", async function () {
    // Login
    const adminAccountToken = await login("admin", "12345");

    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);
    const response = await request
      .delete(`/accounts/${createdAccount._id}`)
      .set("Authorization", adminAccountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.success).toEqual(true);
  });

  test("DELETE: /:accountId should return 401 when not login", async function () {
    // Create account
    const createdAccount = await createAccount({});

    const request = supertest(app);

    await request.delete(`/accounts/${createdAccount._id}`).expect(401);
  });

  test("DELETE: /:accountId should return 404 when accountId not existed", async function () {
    // Login
    const adminAccountToken = await login("admin", "12345");

    const request = supertest(app);

    await request
      .delete(`/accounts/${Types.ObjectId()}`)
      .set("Authorization", adminAccountToken.token)
      .expect(404);
  });
});
