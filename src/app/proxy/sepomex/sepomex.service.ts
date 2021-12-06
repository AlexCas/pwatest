import type { CountryDto, NeighborhoodDto, StateDto, TownDto, ZipCodeDto } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SepomexService {
  apiName = 'Default';

  getCountries = () =>
    this.restService.request<any, CountryDto[]>({
      method: 'GET',
      url: '/api/app/sepomex/countries',
    },
    { apiName: this.apiName });

  getNeighborhood = (zipCodeId: string) =>
    this.restService.request<any, NeighborhoodDto[]>({
      method: 'GET',
      url: `/api/app/sepomex/neighborhood/${zipCodeId}`,
    },
    { apiName: this.apiName });

  getStates = (countryId: number) =>
    this.restService.request<any, StateDto[]>({
      method: 'GET',
      url: `/api/app/sepomex/states/${countryId}`,
    },
    { apiName: this.apiName });

  getTowns = (stateId: number) =>
    this.restService.request<any, TownDto[]>({
      method: 'GET',
      url: `/api/app/sepomex/towns/${stateId}`,
    },
    { apiName: this.apiName });

  getZipCode = (townId: number) =>
    this.restService.request<any, ZipCodeDto[]>({
      method: 'GET',
      url: `/api/app/sepomex/zip-code/${townId}`,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
