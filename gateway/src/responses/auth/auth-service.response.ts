export type AuthServiceResponse<T extends string | number | object> = {
  status: number;
  message?: string;
  error?: string;
  data?: T;
};
