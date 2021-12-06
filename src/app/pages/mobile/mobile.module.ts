import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@core/shared/material.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { MtxGridModule } from '@ng-matero/extensions';
import { OeeMobileComponent } from './reports/oee/oee.component';
import { TvHeaderModule } from 'app/components/shared/tv-header/tv-header.module';
import { HighchartsChartModule } from 'highcharts-angular';
import { mobileRoutes } from './mobile.routing';
import { TimeoutMobileComponent } from './reports/timeout/timeout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrapMobileComponent } from './reports/scrap/scrap.component';
import { ProductionMobileComponent } from './reports/production/production.component';
import { AlertsMobileComponent } from './reports/alerts/alerts.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SurtimientoMobileComponent } from './reports/surtimiento/surtimiento.component';
import { CarouselConfigModule } from 'app/components/shared/carousel-config/carousel-config.module';
import { TrcvstmMobileComponent } from './reports/timeout/components/trcvstm-mobile/trcvstm-mobile.component';
import { TrcvstmTableComponent } from './reports/timeout/components/trcvstm-table/trcvstm-table.component';

@NgModule({
  declarations: [
    OeeMobileComponent,
    TimeoutMobileComponent,
    ScrapMobileComponent,
    ProductionMobileComponent,
    AlertsMobileComponent,
    SurtimientoMobileComponent,
    TrcvstmMobileComponent,
    TrcvstmTableComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MtxGridModule,
    RouterModule.forChild(mobileRoutes),
    TvHeaderModule,
    MatExpansionModule,
    HighchartsChartModule,
    ReactiveFormsModule,
    FormsModule,
    PdfViewerModule,
    CarouselConfigModule
  ],
})
export class MobileModule {}
