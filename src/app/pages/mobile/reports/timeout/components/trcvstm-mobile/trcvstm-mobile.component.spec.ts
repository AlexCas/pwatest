import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrcvstmMobileComponent } from './trcvstm-mobile.component';

describe('TrcvstmMobileComponent', () => {
  let component: TrcvstmMobileComponent;
  let fixture: ComponentFixture<TrcvstmMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrcvstmMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrcvstmMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
