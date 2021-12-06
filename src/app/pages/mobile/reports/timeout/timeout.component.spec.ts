import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutMobileComponent } from './timeout.component';

describe('TimeoutComponent', () => {
  let component: TimeoutMobileComponent;
  let fixture: ComponentFixture<TimeoutMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeoutMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeoutMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
