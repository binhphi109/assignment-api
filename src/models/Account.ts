import mongoose, { Document, model } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "./Role";

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Account {
  _id?: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  email!: string;

  @Prop({ required: true })
  username!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Role" })
  roleId?: string;
  role?: Role;

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ required: true })
  createDate!: Date;

  @Prop({ required: true })
  editDate!: Date;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);

AccountSchema.virtual("role", { ref: "Role", localField: "roleId", foreignField: "_id", justOne: true });

export const AccountModel = model<AccountDocument>(Account.name, AccountSchema);
