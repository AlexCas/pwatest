import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GnlOeeComponent } from './gnl-oee.component';

describe('GnlOeeComponent', () => {
  let component: GnlOeeComponent;
  let fixture: ComponentFixture<GnlOeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GnlOeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GnlOeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
