import { Component, OnInit, Input } from '@angular/core';
import { ScrapHighchartsService } from '../../../services/reports/scrap/scrap.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-warehouse-scrap',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss'],
})
export class WarehouseScrapComponent implements OnInit {
  @Input() warehouse: any;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptionsMavchine: Highcharts.Options;

  constructor(private scrapHighchartsService: ScrapHighchartsService) {}

  ngOnInit(): void {
    this.chartOptionsMavchine =
      this.scrapHighchartsService.setOptionsSuppliesWarehouse(this.warehouse);
  }
}
