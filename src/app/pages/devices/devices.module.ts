import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { DevicesComponent } from './devices.component';
import { devicesRoutes } from './devices.routing';
import { DeviceComponent } from './device/device.component';
import { MtxGridModule } from '@ng-matero/extensions';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MtxGridModule,
    RouterModule.forChild(devicesRoutes),
    NgxMaskModule.forRoot(maskConfig),
  ],
  declarations: [DevicesComponent, DeviceComponent],
})
export class DevicesModule {}
