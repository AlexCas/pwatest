import type { ItemProd3Dto, PlanProdRequestDto, TvPlanProductionDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MachineItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PlanProductionService {
  apiName = 'Default';

  getListItems = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/plan-production/items',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListMachines = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, MachineItem[]>({
      method: 'GET',
      url: '/api/app/plan-production/machines',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListOrders = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/plan-production/orders',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getR1ByIp = (ip: string) =>
    this.restService.request<any, TvPlanProductionDto>({
      method: 'GET',
      url: '/api/app/plan-production/r1By-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  getR3ByIp = (ip: string) =>
    this.restService.request<any, ItemProd3Dto>({
      method: 'GET',
      url: '/api/app/plan-production/r3By-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  post = (input: PlanProdRequestDto) =>
    this.restService.request<any, TvPlanProductionDto>({
      method: 'POST',
      url: '/api/app/plan-production',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
