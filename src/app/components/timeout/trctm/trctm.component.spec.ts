import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrctmComponent } from './trctm.component';

describe('TrctmComponent', () => {
  let component: TrctmComponent;
  let fixture: ComponentFixture<TrctmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrctmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrctmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
