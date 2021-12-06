import { Component, OnInit, Input } from '@angular/core';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import { AppMessages } from '@core/utils/app-messages';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';

@Component({
  selector: 'app-trcvstm-table',
  templateUrl: './trcvstm-table.component.html',
  styleUrls: ['./trcvstm-table.component.scss']
})
export class TrcvstmTableComponent implements OnInit {
  @Input() data: any;
  @Input() name: any;
  @Input() columns: any;

  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 };
  length: number = 0;
  appMessage = new AppMessages();

  constructor() { }

  ngOnInit(): void {
  }

}
