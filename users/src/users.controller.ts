import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IUser } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.create')
  async createUser(payload: IUser) {
    const result = await this.usersService.create(payload);

    return result;
  }

  @MessagePattern('users.get.by.id')
  async getUserById(payload: { id: string }) {
    const result = await this.usersService.getById(payload.id);

    return result;
  }

  @MessagePattern('users.get.by.accountNumber')
  async getUserByAccountNumber(accountNumber: string) {
    const result = await this.usersService.getByAccountNumber(accountNumber);

    return result;
  }

  @MessagePattern('users.get.by.identityNumber')
  async getUserByIdentityNumber(identityNumber: string) {
    const result = await this.usersService.getByIdentityNumber(identityNumber);

    return result;
  }

  @MessagePattern('users.update')
  async updateUser(payload: { id: string; user: IUser }) {
    console.log(payload);

    const result = await this.usersService.updateById(payload.id, payload.user);

    return result;
  }

  @MessagePattern('users.delete')
  async deleteUser(payload: { id: string }) {
    const result = await this.usersService.deleteById(payload.id);

    return result;
  }
}
