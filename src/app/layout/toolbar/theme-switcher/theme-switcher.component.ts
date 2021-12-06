import { Component, OnInit } from '@angular/core';
import { Theme, ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {
  isLightMode = true;

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  toggleLightMode() {
    this.isLightMode = !this.isLightMode;
    const theme = this.isLightMode ? "default" : "dark";
    this.themeService.setTheme(theme);
  }
}
