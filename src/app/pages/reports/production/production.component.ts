import { Component, OnInit } from '@angular/core';
import { PlanProductionService } from '../../../proxy/reports/plan-production.service';
import { IndicatorService, UpdateIndicatorDto } from 'app/proxy/indicators';

const TITLES = [
  'Plan de Producción Ensambles Diario',
  'Avance de Producción del Día por Máquina',
  'Avance de Producción Semanal',
];

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionComponent implements OnInit {
  ip: string = '134.234.422.12';
  productionData: any;
  productionWeekData: any;
  factory: string;
  warehouse: string;
  timeToChangeScreen: number = 7;
  screenCounter: number = 1;
  title: string;
  firstScreen: boolean = true;
  secondScreen: boolean = false;
  thirdScreen: boolean = false;

  indicatorsList: any;
  reportName: string = 'Avance de Producción';
  reportSelected: any;

  minutes: any = 0;
  seconds: any = 0;

  constructor(
    private planProductionService: PlanProductionService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit(): void {
    this.getDataFromService();
    this.getDataWeekFromService();
    this.title = TITLES[0];
    this.getIndicatorList();
  }

  getIndicatorList() {
    this.indicatorService
      .getList()
      .toPromise()
      .then((result) => {
        this.indicatorsList = result;
        this.getIndicatorForReport();
      });
  }

  getIndicatorForReport() {
    this.indicatorsList.map((i) => {
      if (i.name == this.reportName) {
        this.reportSelected = i;
        const _minutes = this.reportSelected.interval / 60;
        const _seconds = this.reportSelected.interval % 60;

        if (_minutes >= 1) {
          this.minutes = _minutes.toFixed(0);
        }
        this.seconds = _seconds;
      }
    });

    this.start();
  }

  getDataWeekFromService() {
    this.planProductionService
      .getR3ByIp(this.ip)
      .toPromise()
      .then((response) => {
        console.log(response);
        this.productionWeekData = response;
      });
  }

  getDataFromService() {
    this.planProductionService
      .getR1ByIp(this.ip)
      .toPromise()
      .then((response) => {
        console.log(response);
        this.productionData = response;
        this.factory = this.productionData.factory;
        this.warehouse = this.productionData.warehouse.name;
      });
  }

  start() {
    let parentThis = this;
    if (this.timeToChangeScreen == 0) {
      this.timeToChangeScreen = this.minutes * 60 + this.seconds;
    }
    setTimeout(function () {
      if (parentThis.screenCounter == 1) {
        parentThis.firstScreen = false;
        parentThis.secondScreen = true;
        parentThis.title = TITLES[1];
        parentThis.screenCounter = 2;
      } else if (parentThis.screenCounter == 2) {
        parentThis.secondScreen = false;
        parentThis.thirdScreen = true;
        parentThis.title = TITLES[2];
        parentThis.screenCounter = 3;
      } else if (parentThis.screenCounter == 3) {
        parentThis.firstScreen = true;
        parentThis.thirdScreen = false;
        parentThis.title = TITLES[0];
        parentThis.screenCounter = 1;
      }
      // Again
      parentThis.start();

      // Every 3 sec
    }, this.timeToChangeScreen * 1000);
  }
}
