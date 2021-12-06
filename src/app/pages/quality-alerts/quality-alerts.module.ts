import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { MtxGridModule } from '@ng-matero/extensions';
import { qualityRoutes } from './quality-alerts.routing';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TvHeaderModule } from '../../components/shared/tv-header/tv-header.module';

@NgModule({  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MtxGridModule,
    RouterModule.forChild(qualityRoutes),
    TvHeaderModule
  ],
  declarations: [FileUploadComponent],
})
export class QualityAlertsModule {}
