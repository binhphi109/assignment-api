export type CreateRoleType = {
  name: string;
  description: string;

  roleView: boolean;
  roleCreate: boolean;
  roleEdit: boolean;
  roleDelete: boolean;

  accountEdit: boolean;
  accountDelete: boolean;

  createDate: Date;
  editDate: Date;
};
