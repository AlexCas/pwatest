import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-trcvstm-mobile',
  templateUrl: './trcvstm-mobile.component.html',
  styleUrls: ['./trcvstm-mobile.component.scss']
})
export class TrcvstmMobileComponent implements OnInit {
  @Input() chartOptions: any;
  @Input() landscape: any;
  @Input() loadChart: any;
  Highcharts: typeof Highcharts = Highcharts;

  constructor() { }

  ngOnInit(): void {
  }

}
