import type { CreateUpdateWarehouseDto, WarehouseDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult, keyValue } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WarehouseService {
  apiName = 'Default';

  getList = () =>
    this.restService.request<any, WarehouseDto[]>({
      method: 'GET',
      url: '/api/app/warehouse',
    },
    { apiName: this.apiName });

  getListByFactoryId = (factoryId: string) =>
    this.restService.request<any, WarehouseDto[]>({
      method: 'GET',
      url: `/api/app/warehouse/by-factory-id/${factoryId}`,
    },
    { apiName: this.apiName });

  getListByProfileNameAndFactoryId = (profile: string, factoryId: string) =>
    this.restService.request<any, keyValue[]>({
      method: 'GET',
      url: `/api/app/warehouse/by-profile-name-and-factory-id/${factoryId}`,
      params: { profile },
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateWarehouseDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/warehouse',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
