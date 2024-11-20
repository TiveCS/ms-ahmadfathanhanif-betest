import { User } from 'src/types/user.type';
import { UsersServiceResponse } from './users-service.response';

export type GetUsersResponse = UsersServiceResponse<User[]>;
