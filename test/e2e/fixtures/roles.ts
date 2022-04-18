import supertest from "supertest";
import app from "../../../src/core/express";
import { randomString } from "../../../src/core/utils/string";
import { Role } from "../../../src/models/Role";
import { login } from "./accounts";

export function generateFakeRole() {
  return {
    name: "role-" + randomString(),
  };
}

export async function createRole(roleData: object): Promise<Role> {
  const accountToken = await login("admin", "12345");

  const data = generateFakeRole();

  const request = supertest(app);
  const response = await request
    .post("/roles")
    .set("Authorization", accountToken.token)
    .send({
      ...data,
      ...roleData,
    })
    .expect(200);

  return response.body;
}
