import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { devicesRoutes } from './profiles.routing';
import { MtxGridModule } from '@ng-matero/extensions';
import { ProfilesComponent } from './profiles.component';
import { ProfileComponent } from './profile/profile.component';
import { FactoryConfigComponent } from '../../components/profiles/factory-config/factory-config.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MtxGridModule,
    RouterModule.forChild(devicesRoutes),
  ],
  declarations: [ProfilesComponent, ProfileComponent, FactoryConfigComponent],
})
export class ProfilesModule {}
