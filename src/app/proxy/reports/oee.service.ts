import type { OeeDto, ReportRequest, TvOeeDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OeeService {
  apiName = 'Default';

  getByIp = (ip: string) =>
    this.restService.request<any, TvOeeDto>({
      method: 'GET',
      url: '/api/app/oee/by-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  getList = (input: ReportRequest) =>
    this.restService.request<any, OeeDto>({
      method: 'GET',
      url: '/api/app/oee',
      params: { factoryId: input.factoryId, warehouseId: input.warehouseId, startDate: input.startDate, endDate: input.endDate },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
