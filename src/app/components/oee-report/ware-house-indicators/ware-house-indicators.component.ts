import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HighchartsGauge from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import { OeeReportServiceService } from '../../../services/reports/oee-report/oee-report-service.service';

HighchartsGauge(Highcharts);
SolidGauge(Highcharts);

@Component({
  selector: 'app-ware-house-indicators',
  templateUrl: './ware-house-indicators.component.html',
  styleUrls: ['./ware-house-indicators.component.scss'],
})
export class WareHouseIndicatorsComponent implements OnInit {
  @Input() warehouse: any = [];
  @Input() title: any = '';
  
  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsGauge: Highcharts.Options;
  chartOptionsWarehouseIndicators: Highcharts.Options;

  constructor(private oeeReportService: OeeReportServiceService) {}

  ngOnInit(): void {
    this.chartOptionsWarehouseIndicators =
      this.oeeReportService.setChartOeeOptions(this.warehouse);

    this.chartOptionsGauge = this.oeeReportService.setOeeGaugeChartOptions(
      this.warehouse
    );
  }
}
