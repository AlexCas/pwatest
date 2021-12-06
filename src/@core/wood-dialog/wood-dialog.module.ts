import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { WoodDialogComponent } from './components/wood-dialog/wood-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    WoodDialogComponent,
    ConfirmDialogComponent
  ],
  exports: [
    WoodDialogComponent,
    ConfirmDialogComponent
  ]
})
export class WoodDialogModule { }
