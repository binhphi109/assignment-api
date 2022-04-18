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

export default router;
