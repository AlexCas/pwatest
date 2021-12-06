import type { CreateUpdateDeviceDto, DeviceDto, DeviceRequestDto, UpdateDeviceStatusDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  apiName = 'Default';

  get = (id: string) =>
    this.restService.request<any, DeviceDto>({
      method: 'GET',
      url: `/api/app/device/${id}`,
    },
    { apiName: this.apiName });

  getList = (request: DeviceRequestDto) =>
    this.restService.request<any, DeviceDto[]>({
      method: 'GET',
      url: '/api/app/device',
      params: { name: request.name, factoryId: request.factoryId, warehouseId: request.warehouseId, isActive: request.isActive },
    },
    { apiName: this.apiName });

  insert = (input: CreateUpdateDeviceDto) =>
    this.restService.request<any, TransactionResult<number>>({
      method: 'POST',
      url: '/api/app/device',
      body: input,
    },
    { apiName: this.apiName });

  update = (input: CreateUpdateDeviceDto) =>
    this.restService.request<any, TransactionResult<number>>({
      method: 'PUT',
      url: '/api/app/device',
      body: input,
    },
    { apiName: this.apiName });

  updateDeviceStatus = (input: UpdateDeviceStatusDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/device/update-status',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
