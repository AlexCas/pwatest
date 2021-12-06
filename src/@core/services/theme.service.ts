import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { SidenavService } from '../../app/layout/sidenav/sidenav.service';

export type Theme = 'default' | 'dark';
export type ThemePosition = 'fixed' | 'above-fixed' | 'static';

export interface ThemeConfig {
  navigation: 'side' | 'top';
  sidenavUserVisible: boolean;
  toolbarVisible: boolean;
  toolbarPosition: ThemePosition;
  footerVisible: boolean;
  footerPosition: ThemePosition;
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _themeSubject = new BehaviorSubject<[Theme, Theme]>([null, 'default']);
  theme$ = this._themeSubject.asObservable();
  activeTheme$ = this.theme$.pipe(
    map(theme => theme[1])
  );
  private _configSubject = new BehaviorSubject<ThemeConfig>({
    navigation: 'side',
    sidenavUserVisible: true,
    toolbarVisible: true,
    toolbarPosition: 'fixed',
    footerVisible: true,
    footerPosition: 'fixed'
  });
  config$ = this._configSubject.asObservable();

  constructor(private sidenavService: SidenavService) {
    this.setTheme('default');
  }

  setTheme(theme: Theme) {
    this._themeSubject.next([this._themeSubject.getValue()[1], theme]);
  }

  setNavigation(navigation: 'side' | 'top') {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      navigation
    });
  }

  setSidenavUserVisible(sidenavUserVisible: boolean) {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      sidenavUserVisible
    });
  }

  setToolbarVisible(toolbarVisible: boolean) {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      toolbarVisible
    });
  }

  setToolbarPosition(toolbarPosition: ThemePosition) {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      toolbarPosition
    });
  }

  setFooterVisible(footerVisible: boolean) {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      footerVisible
    });
  }

  setFooterPosition(footerPosition: ThemePosition) {
    this._configSubject.next({
      ...this._configSubject.getValue(),
      footerPosition
    });
  }

  setStyle(style: 'default' | 'dark' | string) {
    switch (style) {

      case 'dark': {
        this.setTheme('dark');
        break;
      }

    }
  }
}
