import type { ScrapRequestDto, TvScrapDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MachineItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ScrapService {
  apiName = 'Default';

  getByIp = (ip: string) =>
    this.restService.request<any, TvScrapDto>({
      method: 'GET',
      url: '/api/app/scrap/by-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  getList = (input: ScrapRequestDto) =>
    this.restService.request<any, TvScrapDto>({
      method: 'GET',
      url: '/api/app/scrap',
      params: { machines: input.machines, factoryId: input.factoryId, warehouseId: input.warehouseId, startDate: input.startDate, endDate: input.endDate },
    },
    { apiName: this.apiName });

  getListMachines = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, MachineItem[]>({
      method: 'GET',
      url: '/api/app/scrap/machines',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
