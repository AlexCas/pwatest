import { NgModule } from '@angular/core';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { MtxGridModule } from '@ng-matero/extensions';
import { CommonModule } from '@angular/common';
import { CarouselConfigComponent } from './carousel-config.component';

@NgModule({
  declarations: [CarouselConfigComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MtxGridModule,
  ],
  exports: [CarouselConfigComponent],
})
export class CarouselConfigModule {}
