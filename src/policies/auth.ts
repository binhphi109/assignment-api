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

export const AccountEditAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.accountEdit) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};

export const AccountDeleteAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.accountDelete) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};

export const RoleViewAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.roleView) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};

export const RoleCreateAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.roleCreate) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};

export const RoleEditAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.roleEdit) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};

export const RoleDeleteAccess: RequestHandler = function (req, res, next) {
  getAccount(req, res, function (account) {
    if (account.username !== "admin" && !account.role?.roleDelete) {
      throw new AuthenticationError("Authentication failed");
    }

    next();
  });
};
