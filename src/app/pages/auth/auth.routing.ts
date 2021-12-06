import { Routes } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { ResetPwdComponent } from './reset-pwd/reset-pwd.component';

export const authRoutes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
      },
      {
        path: 'register-complete/:email',
        component: ActivateAccountComponent,
      },
      {
        path: 'reset-pwd-complete/:email',
        component: ResetPwdComponent,
      },
    ],
  },
];
