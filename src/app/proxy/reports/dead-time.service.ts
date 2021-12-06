import type { DeadTimeRequestDto, TvDeadTimeDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MachineItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DeadTimeService {
  apiName = 'Default';

  getByIp = (ip: string) =>
    this.restService.request<any, TvDeadTimeDto>({
      method: 'GET',
      url: '/api/app/dead-time/by-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  getList = (input: DeadTimeRequestDto) =>
    this.restService.request<any, TvDeadTimeDto>({
      method: 'GET',
      url: '/api/app/dead-time',
      params: { machines: input.machines, factoryId: input.factoryId, warehouseId: input.warehouseId, startDate: input.startDate, endDate: input.endDate },
    },
    { apiName: this.apiName });

  getListMachines = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, MachineItem[]>({
      method: 'GET',
      url: '/api/app/dead-time/machines',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
