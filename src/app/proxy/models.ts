import type { ResultCode } from './enums/result-code.enum';

export interface ItemDto<T> {
  name?: string;
  items: T[];
  trcItems: T[];
}

export interface ItemOeeDto<T> {
  oee: number;
  oeeColorId: number;
  oeeColorName?: string;
  warehouses: T[];
}

export interface MachineItem {
  machine?: string;
  tbl: number;
}

export interface MessageResult {
  title?: string;
  description?: string;
  redirectUrl?: string;
}

export interface RequestDto {
  skipCount: number;
  maxResultCount: number;
  sorting?: string;
}

export interface TransactionResult<T> {
  result: T;
  resultCode: ResultCode;
  message: MessageResult;
  totalCount: number;
}

export interface basekeeValue {
  id?: string;
  profilingId?: string;
}

export interface keeValue extends basekeeValue {
  name?: string;
}

export interface keesValue {
  id: number;
  name?: string;
}

export interface keyValue {
  id?: string;
  name?: string;
}
