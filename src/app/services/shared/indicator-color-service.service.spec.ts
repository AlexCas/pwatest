import { TestBed } from '@angular/core/testing';

import { IndicatorColorServiceService } from './indicator-color-service.service';

describe('IndicatorColorServiceService', () => {
  let service: IndicatorColorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndicatorColorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
