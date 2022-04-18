import { Types } from "mongoose";
import { AccountModel } from "../../../src/models/Account";
import { RoleModel } from "../../../src/models/Role";

export const runSeed = async function () {
  const ownerRole = await RoleModel.create({
    _id: Types.ObjectId(),
    name: "Owner",
    accountEdit: true,
    accountDelete: true,
    roleView: true,
    roleCreate: true,
    roleEdit: true,
    roleDelete: true,
    createDate: new Date(),
    editDate: new Date(),
  });

  const viewerRole = await RoleModel.create({
    _id: Types.ObjectId(),
    name: "Viewer",
    accountEdit: false,
    accountDelete: false,
    roleView: false,
    roleCreate: false,
    roleEdit: false,
    roleDelete: false,
    createDate: new Date(),
    editDate: new Date(),
  });

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

  // create owner account password 12345
  await AccountModel.create({
    _id: Types.ObjectId(),
    name: "Owner",
    email: "owner@mail.com",
    username: "owner",
    password: "$2a$16$GYtjio4MprlNWouSsZE6d.niOKDiVSCEjfqrlSTuBr5jbsEDcY7W6",
    roleId: ownerRole._id,
    createDate: new Date(),
    editDate: new Date(),
  });

  // create viewer account password 12345
  await AccountModel.create({
    _id: Types.ObjectId(),
    name: "Viewer",
    email: "viewer@mail.com",
    username: "viewer",
    password: "$2a$16$GYtjio4MprlNWouSsZE6d.niOKDiVSCEjfqrlSTuBr5jbsEDcY7W6",
    roleId: viewerRole._id,
    createDate: new Date(),
    editDate: new Date(),
  });

};
