import { Routes, RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles.component';
import { ProfileComponent } from './profile/profile.component';
export const devicesRoutes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
  },
  {
    path: 'add',
    component: ProfileComponent,
  },
  {
    path: 'edit/:id',
    component: ProfileComponent,
  },
];
