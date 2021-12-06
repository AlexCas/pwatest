import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsGauge from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import { OeeReportServiceService } from '../../../services/reports/oee-report/oee-report-service.service';

HighchartsGauge(Highcharts);
SolidGauge(Highcharts);

@Component({
  selector: 'app-gnl-oee',
  templateUrl: './gnl-oee.component.html',
  styleUrls: ['./gnl-oee.component.scss'],
})
export class GnlOeeComponent implements OnInit {
  @Input() factory: any;
  @Input() title: string;
  
  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsGauge: Highcharts.Options;
  chartOptionsWarehouseIndicators: Highcharts.Options;
  constructor(private oeeReportService: OeeReportServiceService) {}

  ngOnInit(): void {
    this.chartOptionsGauge = this.oeeReportService.setOeeGaugeChartOptions(
      this.factory
    );
    this.chartOptionsWarehouseIndicators =
      this.oeeReportService.setOptionsOeeGeneral(this.factory);
  }
}
