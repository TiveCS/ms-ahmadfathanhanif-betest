import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userName: string;

  @Prop()
  emailAddress: string;

  @Prop()
  accountNumber: string;

  @Prop()
  identityNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
