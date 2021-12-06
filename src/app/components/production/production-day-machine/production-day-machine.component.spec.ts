import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDayMachineComponent } from './production-day-machine.component';

describe('ProductionDayMachineComponent', () => {
  let component: ProductionDayMachineComponent;
  let fixture: ComponentFixture<ProductionDayMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionDayMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDayMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
