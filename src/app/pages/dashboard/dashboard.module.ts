import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '@core/shared/material.module';
import { RouterModule } from '@angular/router';
import { dashboardRoutes } from './dashboard.routing';
import { SharedModule } from '@core/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MtxGridModule } from '@ng-matero/extensions';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    //NgxChartsModule
    NgxChartsModule,
    MtxGridModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
