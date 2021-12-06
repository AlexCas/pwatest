import type { AppUserType } from '../enums/app-user-type.enum';
import type { AddressDto, CreateUpdateAddressDto } from '../addresses/models';
import type { IFormFile } from '../microsoft/asp-net-core/http/models';
import type { RequestDto } from '../models';

export interface AppUserDto {
  id?: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  firstName?: string;
  fLastName?: string;
  mLastName?: string;
  roleName?: string;
  userTypeId: AppUserType;
  userType?: string;
  factoryId?: string;
  factoryName?: string;
  departmentId?: string;
  departmentName?: string;
  isActive: boolean;
  address: AddressDto;
  avatarUrl?: string;
}

export interface CreateOrUpdateAppUserDto {
  id?: string;
  firstName: string;
  fLastName: string;
  mLastName?: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  userTypeId: number;
  factoryId: string;
  departmentId: string;
  isActive: boolean;
  address: CreateUpdateAddressDto;
  fullName?: string;
  avatarBase64?: string;
}

export interface PwdDto {
  email?: string;
  token?: string;
  password?: string;
}

export interface ResetPwdDto {
  email?: string;
  token?: string;
  password?: string;
  loginDate?: string;
}

export interface ResetPwdRequestDto {
  email?: string;
}

export interface UpdateAvatarDto {
  id: string;
  file: IFormFile;
}

export interface UpdateUserStatusDto {
  id?: string;
  isActive: boolean;
}

export interface UserRequestDto extends RequestDto {
  name?: string;
  factoryId?: string;
  departmentId?: string;
  isActive?: boolean;
}
