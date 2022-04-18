import { Router } from "express";
import { RoleCreateAccess, RoleDeleteAccess, RoleEditAccess, RoleViewAccess } from "../policies/auth";
import { asyncErrorHandler } from "../core/middlewares/errorHandler";
import { Account } from "../models/Account";
import RoleService from "../services/RoleService";

const router = Router();

router.post(
  "",
  RoleCreateAccess,
  asyncErrorHandler(async function (req, res) {
    const role = req.body;
    const account = req.user as Account;

    const createdRole = await RoleService.createRole({
      ...role,
    });

    res.json(createdRole);
  })
);

router.get(
  "",
  RoleViewAccess,
  asyncErrorHandler(async function (req, res) {
    const account = req.user as Account;

    const roles = await RoleService.getAllRoles();

    res.json(roles);
  })
);

router.get(
  "/:roleId",
  RoleViewAccess,
  asyncErrorHandler(async function (req, res) {
    const roleId = req.params.roleId;

    const role = await RoleService.getRole(roleId);

    res.json(role);
  })
);

router.put(
  "/:roleId",
  RoleEditAccess,
  asyncErrorHandler(async function (req, res) {
    const roleId = req.params.roleId;
    const role = req.body;

    const updatedRole = await RoleService.updateRole({
      ...role,
      _id: roleId,
    });

    res.json(updatedRole);
  })
);

router.delete(
  "/:roleId",
  RoleDeleteAccess,
  asyncErrorHandler(async function (req, res) {
    const roleId = req.params.roleId;

    await RoleService.deleteRole(roleId);

    res.json({ success: true });
  })
);

export default router;
