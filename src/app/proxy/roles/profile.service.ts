import type { AppRoleDto, CreateUpdateProfileDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiName = 'Default';

  delete = (id: string) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'DELETE',
      url: `/api/app/profile/${id}`,
    },
    { apiName: this.apiName });

  getAllList = () =>
    this.restService.request<any, AppRoleDto[]>({
      method: 'GET',
      url: '/api/app/profile/list',
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateProfileDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/profile',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
