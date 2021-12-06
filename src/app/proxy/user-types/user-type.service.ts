import type { CreateUpdateUserTypeDto, UserTypeDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserTypeService {
  apiName = 'Default';

  delete = (id: string) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'DELETE',
      url: `/api/app/user-type/${id}`,
    },
    { apiName: this.apiName });

  getList = () =>
    this.restService.request<any, UserTypeDto[]>({
      method: 'GET',
      url: '/api/app/user-type',
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateUserTypeDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/user-type',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
