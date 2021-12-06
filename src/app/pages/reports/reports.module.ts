import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/shared/material.module';
import { RouterModule } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '@core/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { reportsRoutes } from './reports.routing';
import { OeeReportComponent } from './oee-report/oee-report.component';
import { WareHouseIndicatorsComponent } from '../../components/oee-report/ware-house-indicators/ware-house-indicators.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SurtimientoComponent } from './surtimiento/surtimiento.component';
import { IndicatorComponent } from '../../components/supplies/indicator/indicator.component';
import { TvHeaderModule } from '../../components/shared/tv-header/tv-header.module';
import { QualityAlertsComponent } from './quality-alerts/quality-alerts.component';
import { ScrapComponent } from './scrap/scrap.component';
import { WarehouseScrapComponent } from '../../components/scrap/warehouse/warehouse.component';
import { FactoryComponent } from '../../components/scrap/factory/factory.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { TrctmComponent } from '../../components/timeout/trctm/trctm.component';
import { TimeoutMachineComponent } from '../../components/timeout/timeout-machine/timeout-machine.component';
import { GnlOeeComponent } from '../../components/oee-report/gnl-oee/gnl-oee.component';
import { ProductionComponent } from './production/production.component';
import { ProductionTableComponent } from '../../components/production/table/production-table/production-table.component';
import { MtxGridModule } from '@ng-matero/extensions';
import { DragScrollModule } from 'ngx-drag-scroll';
import { ProductionDayMachineComponent } from '../../components/production/production-day-machine/production-day-machine.component';
import { ProductionWeekMachineComponent } from '../../components/production/production-week-machine/production-week-machine.component';
@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    NgxChartsModule,
    RouterModule.forChild(reportsRoutes),
    HighchartsChartModule,
    PdfViewerModule,
    MtxGridModule,
    DragScrollModule,
    TvHeaderModule,
  ],
  declarations: [
    OeeReportComponent,
    WareHouseIndicatorsComponent,
    SurtimientoComponent,
    IndicatorComponent,
    QualityAlertsComponent,
    ScrapComponent,
    WarehouseScrapComponent,
    FactoryComponent,
    TimeoutComponent,
    TrctmComponent,
    TimeoutMachineComponent,
    GnlOeeComponent,
    ProductionComponent,
    ProductionTableComponent,
    ProductionDayMachineComponent,
    ProductionWeekMachineComponent,
  ],
})
export class ReportsModule {}
