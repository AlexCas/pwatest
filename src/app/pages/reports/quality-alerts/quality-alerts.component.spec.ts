import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityAlertsComponent } from './quality-alerts.component';

describe('QualityAlertsComponent', () => {
  let component: QualityAlertsComponent;
  let fixture: ComponentFixture<QualityAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityAlertsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
