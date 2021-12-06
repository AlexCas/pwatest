import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClickOutsideModule } from '@core/shared/click-outside/click-outside.module';

import { MaterialModule } from '@core/shared/material.module';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component';
import { ToolbarFullscreenToggleComponent } from './toolbar-fullscreen-toggle/toolbar-fullscreen-toggle.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { ToolbarSidenavMobileToggleComponent } from './toolbar-sidenav-mobile-toggle/toolbar-sidenav-mobile-toggle.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarComponent } from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    // ScrollbarModule,
    FormsModule,
    ClickOutsideModule
  ],
  declarations: [
    ToolbarComponent,
    ToolbarUserComponent,
    ToolbarFullscreenToggleComponent,
    ToolbarSidenavMobileToggleComponent,
    ToolbarNotificationsComponent,
    ThemeSwitcherComponent
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
