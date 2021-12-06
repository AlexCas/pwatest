import type { IndicatorDto, SlideTimeDto, UpdateIndicatorDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class IndicatorService {
  apiName = 'Default';

  getList = () =>
    this.restService.request<any, IndicatorDto[]>({
      method: 'GET',
      url: '/api/app/indicator',
    },
    { apiName: this.apiName });

  getSlideTime = (id: number) =>
    this.restService.request<any, SlideTimeDto>({
      method: 'GET',
      url: `/api/app/indicator/slide-time/${id}`,
    },
    { apiName: this.apiName });

  insertIndicator = (input: IndicatorDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/indicator/indicator',
      body: input,
    },
    { apiName: this.apiName });

  update = (input: UpdateIndicatorDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/indicator',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
