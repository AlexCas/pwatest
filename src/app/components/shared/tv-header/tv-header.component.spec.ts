import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvHeaderComponent } from './tv-header.component';

describe('TvHeaderComponent', () => {
  let component: TvHeaderComponent;
  let fixture: ComponentFixture<TvHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
