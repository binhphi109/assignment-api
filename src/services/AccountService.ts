import { Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Account, AccountModel } from "../models/Account";
import { UserInputError, ValidationError, InvalidDataError, NotFoundError } from "../core/errors";
import { CreateAccountType, AccountToken, AccountFilter } from "../types/accounts";
import config from "../config";

class AccountService {
  private validate(account: CreateAccountType | Account) {
    if (account.name == null) {
      throw new ValidationError("name is required");
    }

    if (account.email == null) {
      throw new ValidationError("email is required");
    }

    if (account.username == null) {
      throw new ValidationError("username is required");
    }

    if (account.password == null) {
      throw new ValidationError("password is required");
    }
  }

  async createAccount(account: CreateAccountType): Promise<Account> {
    this.validate(account);

    const foundAccount = await AccountModel.findOne({
      username: account.username,
    })
      .lean()
      .exec();

    if (foundAccount != null) {
      throw new InvalidDataError(`Account '${account.username}' existed`);
    }

    const hashedPassword = await bcrypt.hash(account.password, 16);

    const createdAccount = await AccountModel.create({
      ...account,
      _id: Types.ObjectId(),
      password: hashedPassword,
      createDate: new Date(),
      editDate: new Date(),
    });

    // remove password data
    createdAccount.password = "";

    return createdAccount;
  }

  async login(username: string, password: string): Promise<AccountToken> {
    if (username == null) {
      throw new ValidationError("username is required");
    }

    if (password == null) {
      throw new ValidationError("password is required");
    }

    const account = await AccountModel.findOne({
      username: username.toLowerCase(),
    })
      .lean()
      .exec();

    if (!account) {
      throw new UserInputError("Invalid username or password");
    }

    const same = await bcrypt.compare(password, account.password);

    if (!same) {
      throw new UserInputError("Invalid username or password");
    }

    // Remove sensitive data before return
    account.password = "";

    var token = jwt.sign(
      {
        _id: account._id,
        username: account.username,
      },
      config.tokenSignKey,
      {
        expiresIn: config.tokenExpiresIn,
      }
    );

    return {
      token: "JWT " + token,
      account,
    };
  }

  async getAllAccounts(filter?: AccountFilter): Promise<Account[]> {
    const query = AccountModel.find(
      {
        deleted: false,
      },
      "-password"
    );

    if (filter?.name != null) {
      query.where("name", { $regex: filter.name });
    }

    return query.lean().exec();
  }

  async getAccount(accountId: string): Promise<Account | null> {
    const account = await AccountModel.findOne(
      {
        _id: accountId,
        deleted: false,
      },
      "-password"
    )
      .lean()
      .exec();

    return account;
  }

  async updateAccount(account: Account): Promise<Account> {
    this.validate(account);

    const foundAccount = await AccountModel.findOne({
      _id: account._id,
    })
      .lean()
      .exec();

    if (foundAccount == null) {
      throw new NotFoundError(`Account ${account.username} not existed`);
    }

    const hashedPassword = await bcrypt.hash(account.password, 16);

    const updatedAccount = await AccountModel.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        ...foundAccount,
        ...account,
        password: hashedPassword,
        editDate: new Date(),
      },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedAccount == null) {
      throw new NotFoundError(`Updated Account ${account._id} not existed`);
    }

    // remove password data
    updatedAccount!.password = "";

    return updatedAccount;
  }

  async deleteAccount(accountId: string): Promise<boolean> {
    const account = await AccountModel.findOne({
      _id: accountId,
    })
      .lean()
      .exec();

    if (account == null) {
      throw new NotFoundError(`Account ${accountId} not existed`);
    }

    await AccountModel.findOneAndUpdate(
      {
        _id: account._id,
      },
      {
        deleted: true,
        editDate: new Date(),
      }
    )
      .lean()
      .exec();

    return true;
  }
}

export default new AccountService();
