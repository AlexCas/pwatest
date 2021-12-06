import { NgModule } from '@angular/core';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { MtxGridModule } from '@ng-matero/extensions';
import { CommonModule } from '@angular/common';
import { TvHeaderComponent } from './tv-header.component';

@NgModule({
  declarations: [TvHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MtxGridModule,
  ],
  exports: [TvHeaderComponent],
})
export class TvHeaderModule {}
