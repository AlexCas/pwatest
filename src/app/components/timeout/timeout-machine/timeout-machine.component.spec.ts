import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutMachineComponent } from './timeout-machine.component';

describe('TimeoutMachineComponent', () => {
  let component: TimeoutMachineComponent;
  let fixture: ComponentFixture<TimeoutMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeoutMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
