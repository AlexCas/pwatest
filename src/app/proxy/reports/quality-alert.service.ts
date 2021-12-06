import type { CreateQualityAlertDto, QaRequestDto, QualityAlertDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult, keesValue } from '../models';

@Injectable({
  providedIn: 'root',
})
export class QualityAlertService {
  apiName = 'Default';

  getList = (input: QaRequestDto) =>
    this.restService.request<any, QualityAlertDto[]>({
      method: 'GET',
      url: '/api/app/quality-alert',
      params: { alertTypes: input.alertTypes, factoryId: input.factoryId, warehouseId: input.warehouseId, startDate: input.startDate, endDate: input.endDate },
    },
    { apiName: this.apiName });

  getListAlertTypes = () =>
    this.restService.request<any, keesValue[]>({
      method: 'GET',
      url: '/api/app/quality-alert/alert-types',
    },
    { apiName: this.apiName });

  getListByIp = (ip: string) =>
    this.restService.request<any, QualityAlertDto[]>({
      method: 'GET',
      url: '/api/app/quality-alert/by-ip',
      params: { ip },
    },
    { apiName: this.apiName });

  insert = (input: CreateQualityAlertDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/quality-alert',
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
