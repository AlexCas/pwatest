import { Component, OnInit } from '@angular/core';
import { DeadTimeService } from 'app/proxy/reports/dead-time.service';
import { DeadTimeChartService } from 'app/services/reports/deadtime/deadtime-service';
import * as Highcharts from 'highcharts';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LocalStorageService } from 'app/pages/auth/services/local-storage.service';
import { ProfilingService } from 'app/proxy/profilings/profiling.service';
import { AppMessages } from '@core/utils/app-messages';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { AuthService } from 'app/pages/auth/services/auth.service';

@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.scss'],
})
export class TimeoutMobileComponent implements OnInit {
  tmData: any;
  ip: string = '134.234.422.12';
  Highcharts: typeof Highcharts = Highcharts;

  filterOpen = false;

  chartOptionsWarehouseTRTM: any;
  chartOptionsWarehouseTM: any;

  chartOptionsFactoryTRTM: any;
  chartOptionsFactoryTM: any;

  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 };
  length: number = 0;
  appMessage = new AppMessages();
  form: FormGroup;

  roleName: string;
  rolePermissionsData: any;

  machinesSwitch: boolean = false;

  factorySelected: any;

  machineList: any;
  machineSelected: any = [];

  selectedAllMachines: boolean = false;

  trcWarehouseChecked = true;
  codigoWarehouseChecked = true;
  trcFactoryChecked = true;
  codigoFactoryChecked = true;

  landscape = window.matchMedia('(orientation: landscape)');

  columns: DataGridColumn[] = [
    { header: 'Nave', field: 'name' },
    { header: 'Máquina', field: 'machine' },
    { header: 'Tiempo Muerto', field: 'deadTime' },
    { header: 'Total Real de Corrida', field: 'realRunningTime' },
    { header: 'Porcentaje TRC vs TM', field: 'percentage' },
  ];

  columnsWarehouseTm: DataGridColumn[] = [
    { header: 'Nave', field: 'name' },
    { header: 'Código y Razón del Tiempo Muerto', field: 'reason' },
    { header: 'Máquina', field: 'machine' },
    { header: 'Tiempo Muerto', field: 'percentage' },
  ];

  loadChart: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private deadTimeService: DeadTimeService,
    private deadTimeChartService: DeadTimeChartService,
    private profilingService: ProfilingService,
    private authService: AuthService,
    private router: Router
  ) {
    this.landscape.addEventListener('change', (ev) => {
      console.log('landscape orientation', this.landscape.matches);
    });
    /*document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    }); */
  }

  ngOnInit(): void {
    /*if (!this.authService.getIndicatorsByUser('Tiempo Muerto')){
      this.router.navigateByUrl('/dashboard');
    }*/
    this.getPermissions();
  }

  switchMachine() {
    this.machinesSwitch = true;
  }

  setTmData() {
    const form = this.form.value;
    this.deadTimeService
      .getList({
        machines: JSON.stringify(this.machineSelected),
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
      .then((resp) => {
        this.loadChart = false;
        this.tmData = resp;
        if (!this.machineList) {
          this.getMachineList();
        }
        this.initCharts();
      });
  }

  initCharts() {
    this.chartOptionsWarehouseTRTM =
      this.deadTimeChartService.setChartTRvRMOptions(this.tmData.warehouse);

    this.chartOptionsWarehouseTM =
      this.deadTimeChartService.setChartWarehouseColumnOptions(
        this.tmData.warehouse
      );

    this.chartOptionsFactoryTRTM =
      this.deadTimeChartService.setChartTRvRMOptions(this.tmData);

    this.chartOptionsFactoryTM =
      this.deadTimeChartService.setChartWarehouseColumnOptions(this.tmData);
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
        this.setTmData();
      });
  }

  onWarehouseChange() {
    this.getMachineList();
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

  onFactoryChange(event) {
    const { value, selected } = event.source;
    console.log(value);
    this.factorySelected = value;
  }

  cleanValues(event) {
    event.preventDefault();
    this.filterOpen = false;
    this.machineSelected = [];
    this.loadChart = true;
    this.getPermissions();
  }

  onSubmit() {
    this.filterOpen = false;
    this.loadChart = true;
    console.log(this.filterOpen);
    this.setTmData();
  }

  getMachineList() {
    const form = this.form.value;
    this.deadTimeService
      .getListMachines(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.machineList = result;

        console.log(this.machineList);
      });
  }

  checkMachine(machine) {
    return this.machineSelected.find((m) => machine == m);
  }

  selectMachine(machine, event){
    let _machineList = [];
    if (event == false){
      _machineList = this.machineSelected.filter(_machine => {        
        return _machine.machine != machine.machine;
      });

      console.log(_machineList);

      this.machineSelected = _machineList;
    }else {
      this.machineSelected.push(machine);
    }
  }

  selectMachie(machine, event) {
    const _machineList = [];

    console.log(this.machineList.length);
    for (let i = 0; this.machineList.length >= i; i++) {
      if (this.machineList[i] == machine && !event) {
        if (this.machineList[i - 1]) {
          _machineList.push(this.machineList[i - 1]);
        }
        break;
      } else if (this.machineList[i] == machine) {
        _machineList.push(this.machineList[i]);
        break;
      } else {
        _machineList.push(this.machineList[i]);
      }
    }

    this.machineSelected = _machineList;
  }

  backToForm(event) {
    event.preventDefault();
    this.machinesSwitch = false;
  }

  cleanMachines(event) {
    event.preventDefault();
    this.machineSelected = [];
  }

  selectAllMachines() {
    this.selectedAllMachines = !this.selectedAllMachines;

    if (this.selectedAllMachines) {
      this.machineSelected = this.machineList;
    } else {
      this.machineSelected = [];
    }
  }

  private formInit() {
    this.form = this.fb.group({
      machines: new FormControl(''),
      factoryId: new FormControl(''),
      warehouseId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }
}
