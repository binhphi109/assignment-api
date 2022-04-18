import { AuthenticationError } from "../../../src/core/errors";
import {
  AdminAccess,
  LoginAccess,
} from "../../../src/policies/auth";

describe("policies/auth", function () {
  test("LoginAccess should authenticate successful if login", async function () {
    const req = {
      user: {},
    } as any;
    const res = {} as any;
    const next = jest.fn();

    LoginAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("LoginAccess should authenticate failed if not login", async function () {
    const req = {} as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      LoginAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("AdminAccess should authenticate successful if login as admin", async function () {
    const req = {
      user: {
        username: "admin",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    AdminAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("AdminAccess should authenticate failed if not admin", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      AdminAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

});
