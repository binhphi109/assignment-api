import mongoose, { Document, model } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ required: true })
  createDate!: Date;

  @Prop({ required: true })
  editDate!: Date;
}

export type AccountDocument = Account & Document;
export const AccountSchema = SchemaFactory.createForClass(Account);

export const AccountModel = model<AccountDocument>(Account.name, AccountSchema);
