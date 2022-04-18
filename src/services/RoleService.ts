import { Types } from "mongoose";
import { Role, RoleModel } from "../models/Role";
import { NotFoundError, ValidationError } from "../core/errors";
import { CreateRoleType } from "../types/roles";

class RoleService {
  private validate(role: CreateRoleType | Role) {
    if (role.name == null) {
      throw new ValidationError("name is required");
    }
  }

  async createRole(role: CreateRoleType): Promise<Role> {
    this.validate(role);

    return RoleModel.create({
      ...role,
      _id: Types.ObjectId(),
      deleted: false,
      createDate: new Date(),
      editDate: new Date(),
    });
  }

  async getAllRoles(): Promise<Role[]> {
    return RoleModel.find({
      deleted: false,
    })
      .lean()
      .exec();
  }

  async getRole(id: string): Promise<Role | null> {
    return RoleModel.findOne({
      _id: id,
      deleted: false,
    })
      .lean()
      .exec();
  }

  async updateRole(role: Role): Promise<Role> {
    this.validate(role);

    const updatedRole = await RoleModel.findOneAndUpdate(
      {
        _id: role._id,
      },
      {
        ...role,
        editDate: new Date(),
      },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedRole == null) {
      throw new NotFoundError(`Role ${role._id} not existed`);
    }

    return updatedRole;
  }

  async deleteRole(roleId: string): Promise<boolean> {
    const updatedRole = await RoleModel.findOneAndUpdate(
      {
        _id: roleId,
      },
      {
        deleted: true,
        editDate: new Date(),
      }
    )
      .lean()
      .exec();

    if (updatedRole == null) {
      throw new NotFoundError(`Role ${roleId} not existed`);
    }

    return true;
  }
}

export default new RoleService();
