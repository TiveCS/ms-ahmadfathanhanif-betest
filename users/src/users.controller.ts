import { Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';
import { CreateUserResponse } from './responses/create-user.response';
import { GetUserByIdResponse } from './responses/get-user-by-id.response';
import { GetUsersResponse } from './responses/get-users.response';
import { UpdateUserResponse } from './responses/update-user.response';
import { DeleteUserResponse } from './responses/delete-user.response';
import { IUserFilters } from './interfaces/user-filter.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async createUser(payload: IUser): Promise<CreateUserResponse> {
    const result = await this.usersService.create(payload);

    return {
      status: HttpStatus.CREATED,
      data: result,
    };
  }

  @MessagePattern('users.get.by.id')
  async getUserById(payload: { id: string }): Promise<GetUserByIdResponse> {
    const user = await this.usersService.getById(payload.id);

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  @MessagePattern('users.get')
  async getUsers(payload: IUserFilters): Promise<GetUsersResponse> {
    const result = await this.usersService.getUsers(payload);

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('users.update')
  async updateUser(payload: {
    id: string;
    user: IUser;
  }): Promise<UpdateUserResponse> {
    const result = await this.usersService.updateById(payload.id, payload.user);

    if (!result) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }

  @MessagePattern('users.delete')
  async deleteUser(payload: { id: string }): Promise<DeleteUserResponse> {
    const result = await this.usersService.deleteById(payload.id);

    if (!result) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'User not found',
      };
    }

    return {
      status: HttpStatus.OK,
      data: result,
    };
  }
}
