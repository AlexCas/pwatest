import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingIndicatorModule } from '../../@core/shared/loading-indicator/loading-indicator.module';
import { MaterialModule } from '../../@core/shared/material.module';
import { FooterModule } from './footer/footer.module';
import { LayoutComponent } from './layout.component';
import { SidenavModule } from './sidenav/sidenav.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { SharedModule } from '../../@core/shared.module';
import { BackdropModule } from '@core/shared/backdrop/backdrop.module';
import { SmartTvComponent } from './smart-tv/smart-tv.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    LoadingIndicatorModule,
    SharedModule,

    // Core
    ToolbarModule,
    SidenavModule,
    FooterModule,
    BackdropModule
  ],
  declarations: [LayoutComponent, SmartTvComponent]
})
export class LayoutModule {
}
