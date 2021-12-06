import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SmartTvComponent } from './layout/smart-tv/smart-tv.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { AuthGuard } from './pages/auth/guards';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('./pages/devices/devices.module').then((m) => m.DevicesModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'profiles',
        loadChildren: () =>
          import('./pages/profiles/profiles.module').then(
            (m) => m.ProfilesModule
          ),
      },
      {
        path: 'quality-alerts',
        loadChildren: () =>
          import('./pages/quality-alerts/quality-alerts.module').then(
            (m) => m.QualityAlertsModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./pages/mobile/mobile.module').then(
            (m) => m.MobileModule
          ),
      },
    ],
  },
  {
    path: 'tv',
    component: SmartTvComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/reports/reports.module').then((m) => m.ReportsModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      // preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
