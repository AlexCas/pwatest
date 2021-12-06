import type { CreateUpdateDepartmentDto, DepartmentDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  apiName = 'Default';

  getList = () =>
    this.restService.request<any, DepartmentDto[]>({
      method: 'GET',
      url: '/api/app/department',
    },
    { apiName: this.apiName });

  getListByFactoryId = (factoryId: string) =>
    this.restService.request<any, DepartmentDto[]>({
      method: 'GET',
      url: `/api/app/department/by-factory-id/${factoryId}`,
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateDepartmentDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/department',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
