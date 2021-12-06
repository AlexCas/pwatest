import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/shared/material.module';
import { SmartTvComponent } from './smart-tv.component';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '@core/shared/loading-indicator/loading-indicator.module';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [SmartTvComponent],
  exports: [SmartTvComponent],
})
export class SmartTvModule {}
