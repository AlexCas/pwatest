import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
export const qualityRoutes: Routes = [
  {
    path: '',
    component: FileUploadComponent,
  },
];
