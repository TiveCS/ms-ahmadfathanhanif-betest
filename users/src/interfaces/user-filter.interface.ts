import { Document } from 'mongoose';

export interface IUserFilters extends Document {
  accountNumber?: string;
  identityNumber?: string;
}
