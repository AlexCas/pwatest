import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsGauge from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import { OeeService } from '../../../proxy/reports/oee.service';

Highcharts3D(Highcharts);
HighchartsGauge(Highcharts);
SolidGauge(Highcharts);

@Component({
  selector: 'app-oee-report',
  templateUrl: './oee-report.component.html',
  styleUrls: ['./oee-report.component.scss'],
})
export class OeeReportComponent implements OnInit {
  factoryData: any;

  Highcharts: typeof Highcharts = Highcharts;
  ip: string = '134.234.422.12';

  chartOptionsIndicators: Highcharts.Options;

  constructor(private oeeService: OeeService) {    
  }

  ngOnInit(): void {
    this.getOeeData();
  }

  getOeeData() {
    this.oeeService
      .getByIp(this.ip)
      .toPromise()
      .then((resp) => {
        this.factoryData = resp;
      });
  }
}
