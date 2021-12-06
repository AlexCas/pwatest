import type { basekeeValue, keeValue } from '../models';

export interface CreateFactoDto {
  factoryId: string;
  warehouses: CreateNaveDto[];
}

export interface CreateNaveDto {
  warehouseId: string;
  indicators: string[];
}

export interface CreateProfilingDto {
  name: string;
  userTypeId: string;
  factories: CreateFactoDto[];
}

export interface FactoDto {
  factoryId?: string;
  factoryName?: string;
  warehouses: NaveDto[];
}

export interface NaveDto {
  warehouseId?: string;
  warehouseName?: string;
  indicators: keeValue[];
}

export interface ProfilingDto {
  profileId?: string;
  profileName?: string;
  userTypeId?: string;
  userTypeName?: string;
  factories: FactoDto[];
}

export interface UpdateFactoDto {
  factoryId: string;
  warehouses: UpdateNaveDto[];
}

export interface UpdateNaveDto {
  warehouseId: string;
  indicators: basekeeValue[];
}

export interface UpdateProfilingDto {
  profileId: string;
  factories: UpdateFactoDto[];
}
