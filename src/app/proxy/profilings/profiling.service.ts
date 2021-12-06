import type { CreateProfilingDto, ProfilingDto, UpdateProfilingDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TransactionResult } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProfilingService {
  apiName = 'Default';

  getByProfileId = (profileId: string) =>
    this.restService.request<any, ProfilingDto>({
      method: 'GET',
      url: `/api/app/profiling/by-profile-id/${profileId}`,
    },
    { apiName: this.apiName });

  getList = (profile: string) =>
    this.restService.request<any, ProfilingDto[]>({
      method: 'GET',
      url: '/api/app/profiling',
      params: { profile },
    },
    { apiName: this.apiName });

  getListByProfileName = (profile: string) =>
    this.restService.request<any, ProfilingDto[]>({
      method: 'GET',
      url: '/api/app/profiling/by-profile-name',
      params: { profile },
    },
    { apiName: this.apiName });

  insert = (input: CreateProfilingDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/profiling',
      body: input,
    },
    { apiName: this.apiName });

  update = (input: UpdateProfilingDto) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'PUT',
      url: '/api/app/profiling',
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
