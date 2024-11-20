import { User } from 'src/schemas/user.schema';
import { BaseResponse } from './base.response';

export type GetUserByIdResponse = BaseResponse<User>;