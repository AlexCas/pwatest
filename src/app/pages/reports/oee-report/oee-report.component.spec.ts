import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeReportComponent } from './oee-report.component';

describe('OeeReportComponent', () => {
  let component: OeeReportComponent;
  let fixture: ComponentFixture<OeeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OeeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
