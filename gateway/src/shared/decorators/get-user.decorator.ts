import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: 'email', context: ExecutionContext) => {
    const request: Request = context.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
