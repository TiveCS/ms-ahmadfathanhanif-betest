import { HttpStatus } from '@nestjs/common';

export type UsersServiceResponse<T extends string | number | object> = {
  status: HttpStatus;
  message?: string;
  error?: string;
  data?: T;
};
