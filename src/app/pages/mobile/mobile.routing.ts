import { Routes, RouterModule } from '@angular/router';
import { OeeMobileComponent } from './reports/oee/oee.component';
import { TimeoutMobileComponent } from './reports/timeout/timeout.component';
import { ScrapMobileComponent } from './reports/scrap/scrap.component';
import { ProductionMobileComponent } from './reports/production/production.component';
import { AlertsMobileComponent } from './reports/alerts/alerts.component';
import { SurtimientoMobileComponent } from './reports/surtimiento/surtimiento.component';

export const mobileRoutes: Routes = [
  {
    path: 'oee-report',
    component: OeeMobileComponent,
  },
  {
    path: 'tiempo-muerto',
    component: TimeoutMobileComponent,
  },
  {
    path: 'scrap',
    component: ScrapMobileComponent,
  },
  {
    path: 'production',
    component: ProductionMobileComponent,
  },
  {
    path: 'alertas-calidad',
    component: AlertsMobileComponent,
  },
  {
    path: 'surtimientos',
    component: SurtimientoMobileComponent,
  },
];
