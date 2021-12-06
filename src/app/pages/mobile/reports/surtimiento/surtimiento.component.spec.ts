import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurtimientoComponent } from './surtimiento.component';

describe('SurtimientoComponent', () => {
  let component: SurtimientoComponent;
  let fixture: ComponentFixture<SurtimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurtimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurtimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
