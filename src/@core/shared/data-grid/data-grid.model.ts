export interface DataGridColumn {
    field: string;
    header?: string;
    hide?: boolean;
    disabled?: boolean;
    width?: string;
    type?: any;
    format?: string;
    textAlign?: string;
    sortable?: string;
}