import mongoose, { Document, model } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class Role {
  _id?: string;

  @Prop({ required: true })
  name!: string;

  @Prop({})
  description?: string;

  @Prop({ required: true, default: false })
  accountEdit!: boolean;
  @Prop({ required: true, default: false })
  accountDelete!: boolean;

  @Prop({ required: true, default: false })
  roleView!: boolean;
  @Prop({ required: true, default: false })
  roleCreate!: boolean;
  @Prop({ required: true, default: false })
  roleEdit!: boolean;
  @Prop({ required: true, default: false })
  roleDelete!: boolean;

  @Prop({ required: true, default: false })
  deleted?: boolean;

  @Prop({ required: true })
  createDate!: Date;

  @Prop({ required: true })
  editDate!: Date;
}

export type RoleDocument = Role & Document;
export const RoleSchema = SchemaFactory.createForClass(Role);

export const RoleModel = model<RoleDocument>(Role.name, RoleSchema);
