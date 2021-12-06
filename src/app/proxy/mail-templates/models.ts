import type { AuditedEntity } from '../volo/abp/domain/entities/auditing/models';

export interface CreateUpdateMailTemplateDto {
  subject?: string;
  body?: string;
  title?: string;
  mailTemplateTypeId: number;
  isDeleted: boolean;
}

export interface MailTemplate extends AuditedEntity<string> {
  subject?: string;
  body?: string;
  title?: string;
  mailTemplateTypeId: number;
  isDeleted: boolean;
}
