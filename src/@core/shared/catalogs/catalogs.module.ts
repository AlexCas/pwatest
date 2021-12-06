import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FactoriesComponent } from './factories/factories.component';
import { DepartmentsComponent } from './departments/departments.component';
import { WarehousesComponent } from './warehouses/warehouses.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProfilesComponent } from './profiles/profiles.component';
import { UserTypeComponent } from './userType/userType.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  declarations: [FactoriesComponent, DepartmentsComponent, WarehousesComponent, ProfilesComponent, UserTypeComponent],
  exports: [FactoriesComponent, DepartmentsComponent, WarehousesComponent],
})
export class CatalogsModule { }
