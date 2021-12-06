import { mapEnumToOptions } from '@abp/ng.core';

export enum AppUserType {
  Empleado = 1,
  Cliente = 2,
  Proveedor = 3,
}

export const appUserTypeOptions = mapEnumToOptions(AppUserType);
