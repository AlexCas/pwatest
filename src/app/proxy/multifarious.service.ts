import type { CreateUpdateMailTemplateDto, MailTemplate } from './mail-templates/models';
import type { TransactionResult } from './models';
import { RestService } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MultifariousService {
  apiName = 'Default';

  createFtpCameraFoldersByActivityIdAndCameraId = (activityId: number, cameraId: string) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/multifarious/ftp-camera-folders',
      params: { activityId, cameraId },
    },
    { apiName: this.apiName });

  decryptText = (input: string) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/multifarious/decrypt-text',
      params: { input },
    },
    { apiName: this.apiName });

  encryptText = (input: string) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/multifarious/encrypt-text',
      params: { input },
    },
    { apiName: this.apiName });

  getMailTemplate = () =>
    this.restService.request<any, MailTemplate>({
      method: 'GET',
      url: '/api/app/multifarious/mail-template',
    },
    { apiName: this.apiName });

  insertMailTemplate = (inputs: CreateUpdateMailTemplateDto[]) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/multifarious/mail-template',
      body: inputs,
    },
    { apiName: this.apiName });

  senTestEmail = (email: string) =>
    this.restService.request<any, TransactionResult<string>>({
      method: 'POST',
      url: '/api/app/multifarious/sen-test-email',
      params: { email },
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
