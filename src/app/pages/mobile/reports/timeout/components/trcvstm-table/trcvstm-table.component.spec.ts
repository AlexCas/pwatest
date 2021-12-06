import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrcvstmTableComponent } from './trcvstm-table.component';

describe('TrcvstmTableComponent', () => {
  let component: TrcvstmTableComponent;
  let fixture: ComponentFixture<TrcvstmTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrcvstmTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrcvstmTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
