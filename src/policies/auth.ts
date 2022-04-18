import { AuthenticationError } from "./../core/errors";
import { Request, Response, RequestHandler } from "express";
import { Account } from "../models/Account";

type AccountCBFunc = (account: Account) => void;

function getAccount(req: Request, res: Response, callback: AccountCBFunc) {
  const account = req.user as Account;

  if (!account) {
    throw new AuthenticationError("Authentication failed");
  }

  callback(account);
}

export const LoginAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    next();
  });
};

export const AdminAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin") {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};
