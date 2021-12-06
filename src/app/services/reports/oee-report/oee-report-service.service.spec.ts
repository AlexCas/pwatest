import { TestBed } from '@angular/core/testing';

import { OeeReportServiceService } from './oee-report-service.service';

describe('OeeReportServiceService', () => {
  let service: OeeReportServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OeeReportServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
