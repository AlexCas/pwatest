import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import Highcharts3D from 'highcharts/highcharts-3d';
import HighchartsGauge from 'highcharts/highcharts-more';
import SolidGauge from 'highcharts/modules/solid-gauge.js';
import { OeeService } from 'app/proxy/reports/oee.service';
import { ProfilingService } from 'app/proxy/profilings/profiling.service';
import { OeeReportServiceService } from 'app/services/reports/oee-report/oee-report-service.service';
import * as moment from 'moment';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';
import { LocalStorageService } from 'app/pages/auth/services/local-storage.service';
import { AppMessages } from '@core/utils/app-messages';
import { ResultCode } from 'app/proxy/enums';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/auth/services/auth.service';

Highcharts3D(Highcharts);
HighchartsGauge(Highcharts);
SolidGauge(Highcharts);

@Component({
  selector: 'app-oee',
  templateUrl: './oee.component.html',
  styleUrls: ['./oee.component.scss'],
})
export class OeeMobileComponent implements OnInit {
  factoryData: any;

  Highcharts: typeof Highcharts = Highcharts;
  ip: string = '134.234.422.12';
  chartOptionsGauge: Highcharts.Options;
  chartOptionsWarehouseIndicators: Highcharts.Options;
  appMessage = new AppMessages();
  chartOptionsGnlGauge: Highcharts.Options;
  chartOptionsGnlIndicators: Highcharts.Options;
  roleName: string;
  rolePermissionsData: any;

  startDate: string = '';
  endDate: string = '';

  factorySelected: any;

  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 };
  length: number = 0;
  form: FormGroup;
  formState: FormGroup;

  detailsChecked = true;

  columns: DataGridColumn[] = [
    { header: 'Nave', field: 'warehouse' },
    { header: 'Fecha', field: 'date' },
    { header: 'Tiempo Muerto', field: 'totalDeadTime' },
    { header: 'Tiempo Real de Corrida', field: 'totalRealRunningTime' },
    { header: 'Total Tiempo', field: 'totalTimeWorked' },
    { header: 'Porcentaje de Trabajo', field: 'deadTime' },
    { header: 'Disponibilidad', field: 'availability' },
    { header: 'Efectividad', field: 'efficiency' },
    { header: 'Calidad', field: 'quality' },
    { header: 'OEE', field: 'oee' },
  ];

  filterOpen = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private oeeReportService: OeeReportServiceService,
    private oeeService: OeeService,
    private profilingService: ProfilingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPermissions();
    /*if (!this.authService.getIndicatorsByUser('OEE')){
      this.router.navigateByUrl('/dashboard');
    }*/
  }

  getDate(date){
    return moment(date.slice(0, 10)).format('DD/MM/YYYY');
  }

  getPermissions() {
    const role = this.localStorageService.getUserData().role;
    if (!this.roleName) {
      this.roleName = role;
    }
    this.profilingService
      .getListByProfileName(role)
      .toPromise()
      .then((result) => {
        this.formInit();
        this.rolePermissionsData = result[0];
        this.form.controls['factoryId'].patchValue(
          this.rolePermissionsData.factories[0]
        );
        this.factorySelected = this.rolePermissionsData.factories[0];
        this.sortWarehouses();
        this.form.controls['warehouseId'].patchValue(
          this.rolePermissionsData.factories[0].warehouses[0].warehouseId
        );
        this.getOeeData();
      });
  }

  sortWarehouses() {
    let _warehousesSort = [];
    for (var key in this.factorySelected.warehouses)
      _warehousesSort.push([key, this.factorySelected.warehouses[key]]);

    _warehousesSort.sort(function (a, b) {
      a = a[1];
      b = b[1];

      return a < b ? -1 : a > b ? 1 : 0;
    });

    this.factorySelected.warehouses = _warehousesSort.map((w) => w[1]);

    console.log(this.factorySelected);
  }

  getOeeData() {
    const form = this.form.value;
    this.oeeService
      .getList({
        factoryId: form.factoryId.factoryId,
        warehouseId: form.warehouseId,
        startDate: form.startDate
          ? moment(form.startDate).format('YYYY-MM-DD')
          : null,
        endDate: form.endDate
          ? moment(form.endDate).format('YYYY-MM-DD')
          : null,
      })
      .toPromise()
      .then((result) => {
        this.factoryData = result;
        this.loadCharts();
      });
  }

  getOeeData2() {
    this.oeeService
      .getByIp(this.ip)
      .toPromise()
      .then((result) => {
        this.factoryData = result;
        this.loadCharts();
      });
  }

  loadCharts() {
    if (this.factoryData.warehouse) {
      this.chartOptionsWarehouseIndicators =
        this.oeeReportService.setChartOeeOptions(this.factoryData.warehouse);

      this.chartOptionsGauge =
        this.oeeReportService.setOeeGaugeChartMobileOptions(
          this.factoryData.warehouse
        );
    }

    if (this.factoryData.general) {
      this.chartOptionsGnlIndicators =
        this.oeeReportService.setOptionsOeeGnlMobile2(this.factoryData.general);

      this.chartOptionsGnlGauge =
        this.oeeReportService.setOeeGaugeChartMobileOptions(
          this.factoryData.general
        );
    }
  }

  onFactoryChange(event) {
    const { value, selected } = event.source;
    console.log(value);
    this.factorySelected = value;
  }

  onSubmit() {
    this.filterOpen = false;
    this.getOeeData();
  }

  cleanValues(event) {
    event.preventDefault();
    this.filterOpen = false;
    this.getPermissions();
  }

  private formInit() {
    this.form = this.fb.group({
      factoryId: new FormControl(''),
      warehouseId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }
}
