import { Document } from 'mongoose';

export interface IUser extends Document {
  id?: string;
  userName: string;
  emailAddress: string;
  accountNumber: string;
  identityNumber: string;
}
