import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from './layout/sidenav/sidenav.service';
import { menuFullSize, menuSmallSize } from './menuItems';
import { AuthService } from './pages/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    private sidenavService: SidenavService //private localStorageService: LocalStorageService
  ) {}

  load() {
    this.buildReportsMenu();
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.buildReportsMenu().then((result) => {
        this.sidenavService.addItems(result);
      });
    } else {
      this.buildReportsMenu().then((result) => {
        this.sidenavService.addItems(result);
      });
    }
  }

  buildReportsMenu() {
    return new Promise<any>((resolve, reject) => {
      this.auth
        .setIndicatorsByUser(menuSmallSize, menuFullSize)
        .then((result) => {
          console.log(result);
          resolve(result);
        });
    });
  }
}
