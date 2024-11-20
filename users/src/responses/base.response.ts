import { HttpStatus } from '@nestjs/common';

export type BaseResponse<T extends string | number | object> = {
  status: HttpStatus;
  message?: string;
  error?: string;
  data?: T;
};
