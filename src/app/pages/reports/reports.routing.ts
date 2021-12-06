import { Routes, RouterModule } from '@angular/router';
import { OeeReportComponent } from './oee-report/oee-report.component';
import { SurtimientoComponent } from './surtimiento/surtimiento.component';
import { QualityAlertsComponent } from './quality-alerts/quality-alerts.component';
import { ScrapComponent } from './scrap/scrap.component';
import { TimeoutComponent } from './timeout/timeout.component';
import { ProductionComponent } from './production/production.component';

export const reportsRoutes: Routes = [
  {
    path: 'oee-report',
    component: OeeReportComponent,
  },
  {
    path: 'surtimientos',
    component: SurtimientoComponent,
  },
  {
    path: 'alertas-calidad',
    component: QualityAlertsComponent,
  },
  {
    path: 'scrap',
    component: ScrapComponent,
  },
  {
    path: 'tiempo-muerto',
    component: TimeoutComponent,
  },
	{
		path: 'production',
		component: ProductionComponent
	}
];
