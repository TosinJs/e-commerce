import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document & UserVal;

export class Address {
  addr1: string;

  addr2?: string;

  city: string;

  state: string;

  country: string;

  zip: string;
}

export interface UserVal {
  isValidPassword(password: string): Promise<boolean>;
  _doc: any
}

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false, required: true })
  seller: boolean;

  @Prop({ type: Address, required: true })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.isValidPassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};
