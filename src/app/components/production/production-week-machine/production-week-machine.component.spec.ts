import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionWeekMachineComponent } from './production-week-machine.component';

describe('ProductionWeekMachineComponent', () => {
  let component: ProductionWeekMachineComponent;
  let fixture: ComponentFixture<ProductionWeekMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionWeekMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionWeekMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
