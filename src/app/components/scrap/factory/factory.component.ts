import { Component, OnInit, Input } from '@angular/core';
import { ScrapHighchartsService } from '../../../services/reports/scrap/scrap.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-factory-scrap',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.scss'],
})
export class FactoryComponent implements OnInit {
  @Input() factory: any;
	@Input() type: string;

  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsFactory: Highcharts.Options;

  constructor(private scrapHighchartsService: ScrapHighchartsService) {}

  ngOnInit(): void {
    this.chartOptionsFactory = this.scrapHighchartsService.setOptionsSuppliesFactory(this.factory, this.type);
  }
}
