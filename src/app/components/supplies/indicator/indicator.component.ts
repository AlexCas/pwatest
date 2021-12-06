import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SuppliesService } from '../../../services/reports/supplies/supplies.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  @Input() warehouse: any;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsSupplies: Highcharts.Options;

  constructor(private suppliesService: SuppliesService) {}

  ngOnInit(): void {
    this.chartOptionsSupplies = this.suppliesService.setOptionsSupplies(
      this.warehouse
    );
  }
}
