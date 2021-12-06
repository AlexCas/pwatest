import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { RouterModule } from '@angular/router';
// import { ScrollingModule } from '@angular/cdk/scrolling';
import { BreadcrumbsModule } from './shared/breadcrumbs/breadcrumbs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WoodDialogModule } from './wood-dialog/wood-dialog.module';
import { DataGridModule } from './shared/data-grid/data-grid.module';
import { ImgFallbackDirective } from './directives/img-fallback.directive';
import { CatalogsModule } from './shared/catalogs/catalogs.module';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ImgFallbackDirective],
  exports: [
    CommonModule,
    BreadcrumbsModule,
    SidebarModule,
    RouterModule,

    // External
    FlexLayoutModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    FontAwesomeModule,
    // ScrollingModule,

    //Forms
    FormsModule,
    ReactiveFormsModule,

    //Wood Dialog 
    WoodDialogModule,

    //Data grid
    DataGridModule,

    //ImgFallbackDirective
    ImgFallbackDirective,

    //Catalogs
    CatalogsModule
  ]
})
export class SharedModule {
}
