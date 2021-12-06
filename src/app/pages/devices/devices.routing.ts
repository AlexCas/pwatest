import { Routes, RouterModule } from '@angular/router';
import { DeviceComponent } from './device/device.component';
import { DevicesComponent } from './devices.component';

export const devicesRoutes: Routes = [
  {
    path: "",
    component: DevicesComponent
  },
  {
    path: "add",
    component: DeviceComponent
  }, {
    path: "edit/:id",
    component: DeviceComponent
  },
];
