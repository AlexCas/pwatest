import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { DataGridComponent } from './data-grid.component';


@NgModule({
    imports: [MatTableModule, MatCheckboxModule, CommonModule, MatPaginatorModule],
    exports: [DataGridComponent],
    declarations: [DataGridComponent],
    providers: [],
})
export class DataGridModule { }
