import {
  BadRequestException,
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
    const response = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.CREATE, dto),
    );

    return response;
  }

  @Get()
  @ApiQuery({ name: 'accountNumber', required: false })
  @ApiQuery({ name: 'identityNumber', required: false })
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({
    description:
      "Only one of 'accountNumber' or 'identityNumber' should be passed",
  })
  async findUser(@Query() dto: FindUserDto) {
    const isBothExists = dto.accountNumber && dto.identityNumber;
    const isBothNotExists = !dto.accountNumber && !dto.identityNumber;

    if (isBothExists || isBothNotExists) {
      throw new BadRequestException(
        "Only one of 'accountNumber' or 'identityNumber' should be passed",
      );
    }

    let response;
    if (dto.accountNumber) {
      response = await firstValueFrom(
        this.usersServiceClient.send(
          UsersMessageKey.GET_BY_ACCOUNT_NUMBER,
          dto.accountNumber,
        ),
      );
    }

    if (dto.identityNumber) {
      response = await firstValueFrom(
        this.usersServiceClient.send(
          UsersMessageKey.GET_BY_IDENTITY_NUMBER,
          dto.identityNumber,
        ),
      );
    }

    if (!response) throw new NotFoundException('User not found');

    return response;
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found' })
  @ApiNotFoundResponse({ description: 'User not found' })
  async getUser(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.GET_BY_ID, { id }),
    );

    if (!response) throw new NotFoundException('User not found');

    return response;
  }

  @Put(':id')
  @ApiOkResponse({ description: 'User updated successfully' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    const response = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.UPDATE, { id, user: dto }),
    );

    if (!response) throw new NotFoundException('User not found');

    return response;
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async deleteUser(@Param('id') id: string) {
    const response = await firstValueFrom(
      this.usersServiceClient.send(UsersMessageKey.DELETE, { id }),
    );

    if (!response) throw new NotFoundException('User not found');

    return response;
  }
}
