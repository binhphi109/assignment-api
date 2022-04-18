import { Router } from "express";
import { LoginAccess } from "../policies/auth";
import { asyncErrorHandler } from "../core/middlewares/errorHandler";
import { Account } from "../models/Account";
import AccountService from "../services/AccountService";

const router = Router();

router.post(
  "/token",
  asyncErrorHandler(async function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const accountToken = await AccountService.login(username, password);

    res.json(accountToken);
  })
);

router.post(
  "",
  asyncErrorHandler(async function (req, res) {
    const account = req.user as Account;
    const createAccount = req.body;

    const createdAccount = await AccountService.createAccount({
      ...createAccount,
    });

    res.json(createdAccount);
  })
);

router.get(
  "",
  LoginAccess,
  asyncErrorHandler(async function (req, res) {
    const account = req.user as Account;
    const name = req.query.name as string;

    const accounts = await AccountService.getAllAccounts({
      name,
    });

    res.json(accounts);
  })
);

router.get(
  "/:accountId",
  LoginAccess,
  asyncErrorHandler(async function (req, res) {
    const accountId = req.params.accountId;

    const account = await AccountService.getAccount(accountId);

    res.json(account);
  })
);

router.put(
  "/:accountId",
  LoginAccess,
  asyncErrorHandler(async function (req, res) {
    const accountId = req.params.accountId;
    const account = req.body;

    const updatedAccount = await AccountService.updateAccount({
      ...account,
      _id: accountId,
    });

    res.json(updatedAccount);
  })
);

router.delete(
  "/:accountId",
  LoginAccess,
  asyncErrorHandler(async function (req, res) {
    const accountId = req.params.accountId;

    await AccountService.deleteAccount(accountId);

    res.json({ success: true });
  })
);

export default router;
