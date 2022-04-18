import { Account } from "../models/Account";

export type CreateAccountType = {
  name: string;
  email: string;
  username: string;
  password: string;
  roleId: string;
};

export type AccountFilter = {
  name: string;
};

export type AccountToken = {
  token: string;
  account: Account;
};
