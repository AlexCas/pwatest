import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ProductionService } from 'app/services/reports/production/production.service';

@Component({
  selector: 'app-production-week-machine',
  templateUrl: './production-week-machine.component.html',
  styleUrls: ['./production-week-machine.component.scss'],
})
export class ProductionWeekMachineComponent implements OnInit {
  @Input() production: any;
  Highcharts: typeof Highcharts = Highcharts;

  chartOptionsMonday: Highcharts.Options;
  chartOptionsTuesday: Highcharts.Options;
  chartOptionsWednesday: Highcharts.Options;
  chartOptionsThrusday: Highcharts.Options;
  chartOptionsFriday: Highcharts.Options;
  chartOptionsSaturday: Highcharts.Options;
  chartOptionsSunday: Highcharts.Options;

  constructor(private productionService: ProductionService) {}

  ngOnInit(): void {
    if (this.production.find((prod) => prod.day == 'LUNES')) {
      this.chartOptionsMonday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'LUNES')
      );
    }
    if (this.production.find((prod) => prod.day == 'MARTES')) {
      this.chartOptionsTuesday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'MARTES')
      );
    }
    if (this.production.find((prod) => prod.day == 'MIERCOLES')) {
      this.chartOptionsWednesday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'MIERCOLES')
      );
    }
    if (this.production.find((prod) => prod.day == 'JUEVES')) {
      this.chartOptionsThrusday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'JUEVES')
      );
    }
    if (this.production.find((prod) => prod.day == 'VIERNES')) {
      this.chartOptionsFriday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'VIERNES')
      );
    }
    if (this.production.find((prod) => prod.day == 'SABADO')) {
      this.chartOptionsSaturday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'SABADO')
      );
    }
    if (this.production.find((prod) => prod.day == 'DOMINGO')) {
      this.chartOptionsSunday = this.productionService.getProductionWeek(
        this.production.find((prod) => prod.day == 'DOMINGO')
      );
    }
  }

  getLastClass(day: string) {
    const _days = this.production.map((prod) => prod.day);
    const days = [
      'LUNES',
      'MARTES',
      'MIERCOLES',
      'JUEVES',
      'VIERNES',
      'SABADO',
      'DOMINGO',
    ];

    const myArrayOfDays = _days.sort(function (a, b) {
      return days.indexOf(a) - days.indexOf(b);
    });

    const count = myArrayOfDays.length;
    const _object = myArrayOfDays.find((prod) => prod == day);
    const _index = myArrayOfDays.indexOf(_object);

    if (_index + 1 == count) {
      return 'gp-border-none';
    } else {
      return '';
    }
  }

  getClass(first = true) {
    const count = this.production.length;

    switch (count) {
      case 1:
        return 'col-12';
        break;
      case 2:
        return 'col-6';
        break;
      case 3:
        return 'col-4';
        break;
      case 4:
        return first ? 'col-4' : 'col-12';
        break;
      case 5:
        return first ? 'col-4' : 'col-6';
        break;
      case 6:
        return 'col-4';
        break;
      case 7:
        return first ? 'col-4' : 'col-3';
        break;
      default:
        return 'col-4';
        break;
    }
  }
}
