import { AuthenticationError } from "../../../src/core/errors";
import {
  AccountDeleteAccess,
  AccountEditAccess,
  AdminAccess,
  LoginAccess,
  RoleCreateAccess,
  RoleDeleteAccess,
  RoleEditAccess,
  RoleViewAccess,
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

  test("AccountEditAccess should authenticate successful if having role accountEdit", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          accountEdit: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    AccountEditAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("AccountEditAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      AccountEditAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("AccountEditAccess should authenticate failed if having no role accountEdit", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          accountEdit: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      AccountEditAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("AccountDeleteAccess should authenticate successful if having role accountDelete", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          accountDelete: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    AccountDeleteAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("AccountDeleteAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      AccountDeleteAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("AccountDeleteAccess should authenticate failed if having no role accountDelete", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          accountDelete: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      AccountDeleteAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleViewAccess should authenticate successful if having role roleView", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleView: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    RoleViewAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("RoleViewAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleViewAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleViewAccess should authenticate failed if having no role roleView", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleView: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleViewAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleCreateAccess should authenticate successful if having role roleCreate", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleCreate: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    RoleCreateAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("RoleCreateAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleCreateAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleCreateAccess should authenticate failed if having no role roleCreate", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleCreate: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleCreateAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleEditAccess should authenticate successful if having role roleEdit", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleEdit: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    RoleEditAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("RoleEditAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleEditAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleEditAccess should authenticate failed if having no role roleEdit", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleEdit: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleEditAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleDeleteAccess should authenticate successful if having role roleDelete", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleDelete: true,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    RoleDeleteAccess(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("RoleDeleteAccess should authenticate failed if having no role assigned", async function () {
    const req = {
      user: {
        username: "tester",
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleDeleteAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });

  test("RoleDeleteAccess should authenticate failed if having no role roleDelete", async function () {
    const req = {
      user: {
        username: "tester",
        role: {
          roleDelete: false,
        },
      },
    } as any;
    const res = {} as any;
    const next = jest.fn();

    const t = () => { 
      RoleDeleteAccess(req, res, next);
    };

    expect(t).toThrow(AuthenticationError);
  });
});
