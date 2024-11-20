import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { UsersMessageKey } from 'src/constants/users/users-message-key.constant';
import { CreateUserResponse } from 'src/responses/users/create-user.response';
import { DeleteUserResponse } from 'src/responses/users/delete-user.response';
import { GetUserByIdResponse } from 'src/responses/users/get-user-by-id.response';
import { GetUsersResponse } from 'src/responses/users/get-users.response';
import { UpdateUserResponse } from 'src/responses/users/update-user.response';
import { AuthenticatedGuard } from 'src/shared/guards/authenticated.guard';
import { USERS_SERVICE } from '../constants/proxy.constant';
import { CreateUserDto } from '../dto/users/create-user.dto';
import { FindUserDto } from '../dto/users/find-user.dto';
import { UpdateUserDto } from '../dto/users/update-user.dto';

@Controller({
  path: 'users',
  version: ['1'],
})
@UseGuards(AuthenticatedGuard)
@ApiTags('users')
@ApiSecurity('bearer')
export class UsersController {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersServiceClient: ClientProxy,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'User created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  async createUser(@Body() dto: CreateUserDto) {
    const response: CreateUserResponse = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.CREATE, dto),
    );

    return response;
  }

  @Get()
  @ApiQuery({ name: 'accountNumber', required: false })
  @ApiQuery({ name: 'identityNumber', required: false })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUsers(@Query() dto: FindUserDto) {
    const response: GetUsersResponse = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.GET_MANY, dto),
    );

    if (!response) throw new NotFoundException('User not found');

    return response;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUserById(@Param('id') id: string) {
    const response: GetUserByIdResponse = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.GET_BY_ID, { id }),
    );

    return response;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const response: UpdateUserResponse = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.UPDATE, { id, user: dto }),
    );

    return response;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async deleteUser(@Param('id') id: string) {
    const response: DeleteUserResponse = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.DELETE, { id }),
    );

    return response;
  }
}
