import { User } from 'src/schemas/user.schema';
import { BaseResponse } from './base.response';

export type DeleteUserResponse = BaseResponse<User>;
