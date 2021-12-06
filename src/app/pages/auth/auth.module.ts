import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@core/shared.module';
import { MaterialModule } from '@core/shared/material.module';
import { authRoutes } from './auth.routing';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

@NgModule({
    imports: [
        MaterialModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(authRoutes)
    ],
    declarations: [
        LoginComponent,
        ForgotPasswordComponent,
        ActivateAccountComponent,
        ResetPwdComponent
    ]
})

export class AuthModule { }
