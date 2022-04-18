import supertest from "supertest";
import app from "../../../src/core/express";
import { randomString } from "../../../src/core/utils/string";
import { Account } from "../../../src/models/Account";
import { AccountToken } from "../../../src/types/accounts";

export function generateFakeAccount() {
  const name = "account-" + randomString();

  return {
    name: name,
    email: "test@mail.com",
    username: name,
    password: "12345",
  };
}

export async function createAccount(accountData: object) : Promise<Account> {
  const data = generateFakeAccount();

  const request = supertest(app);
  const response = await request.post("/accounts").send({
    ...data,
    ...accountData,
  }).expect(200);

  return response.body;
}

export async function login(username: string, password: string) : Promise<AccountToken> {
  const request = supertest(app);
  const response = await request.post("/accounts/token").send({
    username,
    password,
  }).expect(200);

  return response.body;
}