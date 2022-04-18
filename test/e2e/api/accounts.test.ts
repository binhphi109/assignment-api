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

});
