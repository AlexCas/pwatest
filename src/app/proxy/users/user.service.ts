import type { AppUserDto, CreateOrUpdateAppUserDto, PwdDto, ResetPwdDto, ResetPwdRequestDto, UpdateAvatarDto, UpdateUserStatusDto, UserRequestDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiName = 'Default';

  completeRegistration = (input: PwdDto) =>
    this.restService.request<any, TransactionResult<boolean>>({
      method: 'POST',
      url: '/api/app/user/complete-registration',
      body: input,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, AppUserDto>({
      method: 'GET',
      url: `/api/app/user/${id}`,
    },
    { apiName: this.apiName });

  getList = (request: UserRequestDto) =>
    this.restService.request<any, PagedResultDto<AppUserDto>>({
      method: 'GET',
      url: '/api/app/user',
      params: { name: request.name, factoryId: request.factoryId, departmentId: request.departmentId, isActive: request.isActive, skipCount: request.skipCount, maxResultCount: request.maxResultCount, sorting: request.sorting },
    },
    { apiName: this.apiName });

  register = (input: CreateOrUpdateAppUserDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/user/register',
      body: input,
    },
    { apiName: this.apiName });

  resetPasswordByInput = (input: ResetPwdDto) =>
    this.restService.request<any, TransactionResult<boolean>>({
      method: 'POST',
      url: '/api/app/user/reset-password',
      body: input,
    },
    { apiName: this.apiName });

  resetPasswordRequestByInput = (input: ResetPwdRequestDto) =>
    this.restService.request<any, TransactionResult<boolean>>({
      method: 'POST',
      url: '/api/app/user/reset-password-request',
      body: input,
    },
    { apiName: this.apiName });

  updateAvatarUrl = (input: UpdateAvatarDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/user/update-avatar',
    },
    { apiName: this.apiName });

  updateUser = (input: CreateOrUpdateAppUserDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/user/update-user',
      body: input,
    },
    { apiName: this.apiName });

  updateUserStatus = (input: UpdateUserStatusDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/user/update-status',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
