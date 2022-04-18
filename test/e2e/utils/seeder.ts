import { Types } from "mongoose";
import { AccountModel } from "../../../src/models/Account";
import { RoleModel } from "../../../src/models/Role";

export const runSeed = async function () {
  
  // create admin account password 12345
  await AccountModel.create({
    _id: Types.ObjectId(),
    name: "Admin",
    email: "admin@mail.com",
    username: "admin",
    password: "$2a$16$GYtjio4MprlNWouSsZE6d.niOKDiVSCEjfqrlSTuBr5jbsEDcY7W6",
    createDate: new Date(),
    editDate: new Date(),
  });

};
