import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WareHouseIndicatorsComponent } from './ware-house-indicators.component';

describe('WareHouseIndicatorsComponent', () => {
  let component: WareHouseIndicatorsComponent;
  let fixture: ComponentFixture<WareHouseIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WareHouseIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WareHouseIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
