import { mapEnumToOptions } from '@abp/ng.core';

export enum ResultCode {
  Success = 1,
  Alert = 2,
  Warning = 3,
  Fatal = 4,
  Unauthorized = 5,
  InvalidModel = 6,
  TokenExpired = 7,
}

export const resultCodeOptions = mapEnumToOptions(ResultCode);
