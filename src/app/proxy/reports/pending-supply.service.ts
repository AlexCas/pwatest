import type { PendingSupplyRequestDto, TvPendingSupplyDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { MachineItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PendingSupplyService {
  apiName = 'Default';

  getByIp = (ip: string) =>
    this.restService.request<any, TvPendingSupplyDto>({
      method: 'GET',
      url: '/api/app/pending-supply/by-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  getListFolios = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/pending-supply/folios',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListItemsComponent = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/pending-supply/items-component',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListItemsFather = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/pending-supply/items-father',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListMachines = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, MachineItem[]>({
      method: 'GET',
      url: '/api/app/pending-supply/machines',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  getListOrders = (factoryId: string, warehouseId: string) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: '/api/app/pending-supply/orders',
      params: { factoryId, warehouseId },
    },
    { apiName: this.apiName });

  post = (input: PendingSupplyRequestDto) =>
    this.restService.request<any, TvPendingSupplyDto>({
      method: 'POST',
      url: '/api/app/pending-supply',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
