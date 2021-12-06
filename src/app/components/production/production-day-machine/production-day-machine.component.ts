import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductionService } from 'app/services/reports/production/production.service';

@Component({
  selector: 'app-production-day-machine',
  templateUrl: './production-day-machine.component.html',
  styleUrls: ['./production-day-machine.component.scss'],
})
export class ProductionDayMachineComponent implements OnInit {
	@Input() machines: any;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options;

  constructor(private productionService: ProductionService) {}

  ngOnInit(): void {
    console.log('Maquinas');
		console.log(this.machines);
    this.chartOptions =
      this.productionService.getOptionsForProductionDayMachine(this.machines);
  }
}
