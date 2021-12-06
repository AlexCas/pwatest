import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { environment } from '@env/environment';
import { ResultCode } from 'app/proxy/enums';
import {
  PwdDto,
  ResetPwdDto,
  ResetPwdRequestDto,
  UserService,
} from 'app/proxy/users';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ProfilingService } from 'app/proxy/profilings/profiling.service';

import { User } from '../models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private localStorageService: LocalStorageService;
  private API_TOKEN = `${environment.apis.default.url}/connect/token`;

  private _user = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private woodDialogService: WoodDialogService,
    private userService: UserService,
    private profilingService: ProfilingService,
    @Inject(LocalStorageService) localStorageService: LocalStorageService
  ) {
    // this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    // this.currentUser$ = this.currentUserSubject.asObservable();

    this.localStorageService = localStorageService;

    // const subscr = this.getUserByToken().subscribe();
    // this.unsubscribe.push(subscr);
  }

  login(value: any): void {
    const urlencoded = new URLSearchParams();
    urlencoded.set('client_id', environment.oAuthConfig.clientId || '');
    urlencoded.set('grant_type', 'password');
    urlencoded.set('userName', value.email);
    urlencoded.set('password', value.password);
    urlencoded.set(
      'scope',
      `openid offline_access profile ${environment.application.name}`
    );

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    this.httpClient
      .post(this.API_TOKEN, urlencoded.toString(), {
        headers,
        observe: 'response',
      })
      .toPromise()
      .then((result: any) => {
        if (result && result.body && result.body.access_token) {
          this.localStorageService.setJwtToken(result.body.access_token);
          const prevUrl = sessionStorage.getItem('prevRoute');
          sessionStorage.removeItem('prevRoute');
          console.log(prevUrl);
          if (prevUrl) {
            this.router.navigateByUrl(prevUrl);
          } else {
            window.location.href = '/dashboard';
          }
        } else {
        }
      })
      .catch((err) => {
        const result = { resultCode: 2, message: {} };
        const error = err?.error?.error || null;
        const description = err?.error?.error_description || '';
        if (error === 'invalid_grant') {
          if (
            description.includes('account has been locked') ||
            description.includes('usuario ha sido bloqueada')
          ) {
            result.message = AppMessages.invalidGrantLockedAccount;
          } else if (
            description.includes('confirm your email') ||
            description.includes('confirmar tu e-mail')
          ) {
            result.message = AppMessages.invalidGrantConfirmAccount;
          } else {
            result.message = AppMessages.invalidGrantEmailOrPwdInvalid;
          }
          // handle Result
          this.woodDialogService.handleResult(result);
        } else {
          // this.toaster.error("error de ingresar");
          console.log(error);
        }
      });
  }

  getMenusByUserAsync(userId: string): Promise<any[]> {
    return new Promise<any>((resolve, reject) => {
      this.httpClient
        .get(`${environment.apis.default.url}/api/app/menu/by-user/${userId}`)
        .subscribe((response: any[]) => {
          resolve(response);
        }, reject);
    });
  }

  public setIndicatorsByUser(menuSmallSize, menuFullSize) {
    return new Promise<any>((resolve, reject) => {
      const role = this.localStorageService.getUserData().role;
      if (role) {
        this.profilingService
          .getListByProfileName(role)
          .toPromise()
          .then((result) => {
            let isInProfiling = false;
            const response: any = result[0];
            let newMenu = [];
            if (role == 'Administrador') {
              menuFullSize.map((menuItem) => {
                newMenu.push(menuItem);
              });
            }
            if (response) {
              response.factories.map((profile) => {
                profile.warehouses.map((w) => {
                  w.indicators.map((i) => {
                    menuSmallSize.map((menuItem) => {
                      if (menuItem.profileName == i.name) {
                        newMenu.push(menuItem);
                      }
                    });
                  });
                });
              });

              resolve(newMenu);
            }
          });
      }
    });
  }

  public checkPassword(): void {}

  public signOut(): void {
    localStorage.removeItem('token');
  }

  public getUser() {
    return this.localStorageService.getUserData();
  }

  isUserAuthenticated(): boolean {
    return !this.localStorageService.isTokenExpired();
  }

  resetPasswordRequest(email: string): void {
    const data: ResetPwdRequestDto = {
      email,
    };
    this.userService
      .resetPasswordRequestByInput(data)
      .toPromise()
      .then((result) => {
        email = '';
        this.woodDialogService.handleResult(result);
      })
      .catch((error) => {
        this.woodDialogService.handleError(error);
      });
  }

  resetPasswordComplete(value: ResetPwdDto): any {
    this.userService
      .resetPasswordByInput(value)
      .toPromise()
      .then((result) => {
        this.woodDialogService.handleResult(result).then(() => {
          if (result.resultCode === ResultCode.Success) {
            this.router.navigate(['/auth/login']);
          }
          if (result.resultCode === ResultCode.TokenExpired) {
            this.router.navigate(['/auth/reset-pwd']);
          }
        });
      })
      .catch((error) => {
        this.woodDialogService.handleError(error);
      });
  }

  completeRegistration(value: PwdDto): any {
    this.userService
      .completeRegistration(value)
      .toPromise()
      .then((result) => {
        this.woodDialogService.handleResult(result).then(() => {
          if (result.resultCode === ResultCode.Success) {
            this.router.navigate(['/auth/login']);
          }
          if (result.resultCode === ResultCode.TokenExpired) {
            this.router.navigate(['/auth/forgot-password']);
          }
        });
      })
      .catch((error) => {
        this.woodDialogService.handleError(error);
      });
  }

  logOut(): void {
    console.log('logOut');
    this.localStorageService.clearLocalStorage();
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }
}
