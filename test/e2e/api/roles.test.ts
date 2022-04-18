import supertest from "supertest";
import app from "../../../src/core/express";
import { setupTestDB } from "../utils/setupTest";
import { login } from "../fixtures/accounts";
import { createRole } from "../fixtures/roles";

setupTestDB();

describe("api/roles", function () {
  test("POST: / should create role successful", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    var data = {
      name: "Test Role Create",
    };

    const request = supertest(app);
    const response = await request
      .post("/roles")
      .set("Authorization", accountToken.token)
      .send(data)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(data.name);
  });

  test("GET: / should return list of roles", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create role
    await createRole({});

    const request = supertest(app);
    const response = await request
      .get("/roles")
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body).toHaveLength(4);
  });

  test("GET: /:roleId should return an role by id", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create role
    const createdRole = await createRole({});

    const request = supertest(app);
    const response = await request
      .get(`/roles/${createdRole._id}`)
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(createdRole.name);
  });

  test("PUT: /:roleId should update role successfully", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create role
    const createdRole = await createRole({});

    // Create role credentials
    var data = {
      name: "Test Role Update",
      roleView: true,
      roleCreate: true,
      roleEdit: true,
      roleDelete: true,
    };

    const request = supertest(app);
    const response = await request
      .put(`/roles/${createdRole._id}`)
      .set("Authorization", accountToken.token)
      .send(data)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.name).toEqual(data.name);
  });

  test("DELETE: /:roleId should delete role successfully", async function () {
    // Login
    const accountToken = await login("admin", "12345");

    // Create role
    const createdRole = await createRole({});

    const request = supertest(app);
    const response = await request
      .delete(`/roles/${createdRole._id}`)
      .set("Authorization", accountToken.token)
      .expect(200);

    expect(response.body).not.toBeNull();
    expect(response.body.success).toEqual(true);
  });
});
