import type { CreateUpdateFactoryDto, FactoryDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult, keyValue } from '../models';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  apiName = 'Default';

  getList = () =>
    this.restService.request<any, FactoryDto[]>({
      method: 'GET',
      url: '/api/app/factory',
    },
    { apiName: this.apiName });

  getListByProfileName = (profile: string) =>
    this.restService.request<any, keyValue[]>({
      method: 'GET',
      url: '/api/app/factory/by-profile-name',
      params: { profile },
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateFactoryDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/factory',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
