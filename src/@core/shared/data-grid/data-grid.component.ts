import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataGridColumn } from './data-grid.model';



@Component({
    selector: 'app-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() public data: any[] = [];
    @Input() public length = 0;

    @Input() public pageIndex = 0;
    @Input() public pageSize = 5;
    @Input() public pageSizeOptions = [5, 10, 20, 50, 100];

    @Input() public columns: DataGridColumn[] = [];
    @Input() public multiSelectable = false;
    @Input() public cellTemplate: TemplateRef<any> | any;
    @Input() public rowSelectable = false;

    @Output() public selectedRows: EventEmitter<any> = new EventEmitter();

    @Output() public page: EventEmitter<any> = new EventEmitter();
    public dataSource = new MatTableDataSource([])
    displayedColumns: string[] = [];
    selection = new SelectionModel(true, []);

    constructor() { }

    ngOnInit(): void {
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
    ngOnChanges(changes: SimpleChanges) {
        this.displayedColumns = this.columns.filter(item => !item.hide).map(item => item.field);
        if (this.multiSelectable) {
            this.displayedColumns.unshift("select")
        }

        if (this.rowSelectable) {
            this.selection = new SelectionModel<any>(this.multiSelectable, []);
        }


        if (changes.data && changes.data.previousValue !== changes.data.currentValue) {
            this.dataSource = new MatTableDataSource(this.data);
        }
    }
    pageEvent(e) {
        this.page.emit(e)
    }
    emitSelected(): void {
        this.selectedRows.emit(this.selection.selected);
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
        this.emitSelected();
    }

    toggle(event: MatCheckboxChange, row: any): void {
        if (event) this.selection.toggle(row)
        this.emitSelected();
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
    }

    isSelected(row) {
        return this.selection.isSelected(row)
    }

    toggleSelected(row) {
        this.selection.toggle(row)
        this.emitSelected();
    }

    _isTemplateRef(obj: any) {
        return obj instanceof TemplateRef;
    }
    _getIndex(index: number, dataIndex: number) {
        return typeof index === 'undefined' ? dataIndex : index;
    }
}
