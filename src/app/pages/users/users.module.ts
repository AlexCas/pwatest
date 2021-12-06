import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { usersRoutes } from './users.routing';
import { MaterialModule } from '@core/shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@core/shared.module';
import { UserComponent } from './user/user.component';
import { MtxGridModule } from '@ng-matero/extensions';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    MtxGridModule,
    RouterModule.forChild(usersRoutes)
  ],
  declarations: [
    UsersComponent,
    UserComponent,
  ]
})
export class UsersModule { }
