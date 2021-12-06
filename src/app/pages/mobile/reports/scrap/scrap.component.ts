import { Component, OnInit } from '@angular/core';
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
import { ScrapService } from 'app/proxy/reports/scrap.service';
import { ScrapHighchartsService } from 'app/services/reports/scrap/scrap.service';
import { data } from './data';

@Component({
  selector: 'app-scrap',
  templateUrl: './scrap.component.html',
  styleUrls: ['./scrap.component.scss'],
})
export class ScrapMobileComponent implements OnInit {
  ip: string = '134.234.422.12';
  Highcharts: typeof Highcharts = Highcharts;
  filterOpen = false;

  scrapData: any;

  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 };
  length: number = 0;
  appMessage = new AppMessages();
  form: FormGroup;

  factorySelected: any;

  roleName: string;
  rolePermissionsData: any;

  selectedAllMachines: boolean = false;

  machineList: any = [];
  machineSelected: any = [];

  machinesSwitch: boolean = false;

  chartOptionsWarehouseTRTM: any;
  chartOptionsGnlTRTM: any;
  chartOptionsMolde: any;

  scrapWarehouseDetail = true;
  scrapWarehouseDetailFactory = true;
  scrapWarehouseMoldeDetail = true;

  loadChart: boolean = false;

  landscape = window.matchMedia('(orientation: landscape)');

  numberFormat = new Intl.NumberFormat('es-MX');

  columns: DataGridColumn[] = [
    { header: 'Nave', field: 'name' },
    { header: 'Máquina', field: 'machine' },
    { header: 'Cantidad de Scrap', field: 'scrapQuantity' },
    { header: 'Costo por Nave', field: 'scrapCost' },
    { header: 'Porcentaje por Nave', field: 'gnlCostPercentage' },
    { header: 'Porcentaje por Planta', field: 'scrapCostPercentage' },
    { header: 'Cantidad Completada', field: 'completedQuantity' },
    { header: 'Porcentaje de Scrap', field: 'gnlScrapPercentage' },
  ];

  columnsMolde: DataGridColumn[] = [
    { header: 'Nave', field: 'name' },
    { header: 'Máquina', field: 'machine' },
    { header: 'Molde', field: 'mold' },
    { header: 'Código-Razón Scrap', field: 'reasonCode' },
    { header: 'Piezas Scrap', field: 'articleNumber' },
    { header: 'Porcentaje de Scrap', field: 'scrapPercentage' },
    { header: 'Costo', field: 'scrapCost' },
  ];

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private profilingService: ProfilingService,
    private scrapService: ScrapService,
    private scrapHighchartsService: ScrapHighchartsService
  ) {
    this.landscape.addEventListener('change', (ev) => {
      console.log('landscape orientation', this.landscape.matches);
    });
    /*document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    }); */
  }

  ngOnInit(): void {
    this.getPermissions();
  }

  setScrapData() {
    const form = this.form.value;
    this.scrapService
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
      .then((result) => {
        this.scrapData = null;
        console.log(result);
        this.loadChart = false;
        this.scrapData = result;
        if (this.machineSelected.length == 0) {
          this.getMachineList();
        }
        this.loadCharts();
      });
  }

  getFactoryName() {
    const factoryId = this.form.value;
    let _name = '';

    this.rolePermissionsData.factories.map((f) => {
      if (f.factoryId == factoryId.factoryId.factoryId) {
        _name = f.factoryName;
      }
    });

    return _name;
  }

  getWarehouseName() {
    const form = this.form.value;
    let _name = '';

    this.rolePermissionsData.factories.map((f) => {
      if (f.factoryId == form.factoryId.factoryId) {
        f.warehouses.map((w) => {
          if (w.warehouseId == form.warehouseId) {
            _name = w.warehouseName;
          }
        });
      }
    });

    return _name;
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

  getMachineList() {
    const form = this.form.value;
    this.scrapService
      .getListMachines(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.machineList = result;
      });
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
        this.setScrapData();
      });
  }

  onWarehouseChange() {
    this.getMachineList();
  }

  loadCharts() {
    this.chartOptionsWarehouseTRTM =
      this.scrapHighchartsService.setOptionsSuppliesMobileFactory(
        this.scrapData.warehouse,
        'warehouse'
      );
    this.chartOptionsGnlTRTM =
      this.scrapHighchartsService.setOptionsSuppliesMobileFactory(
        this.scrapData,
        'factory'
      );

    this.chartOptionsMolde =
      this.scrapHighchartsService.setOptionsMoldeMobileFactory(
        this.scrapData.warehouse.moldeRazonItems
      );
  }

  onFactoryChange(event) {
    const { value, selected } = event.source;
    console.log(value);
    this.factorySelected = value;
  }

  cleanValues(event) {
    event.preventDefault();
    this.loadChart = true;
    this.filterOpen = false;
    this.machineSelected = [];
    this.getPermissions();
  }

  switchMachine() {
    this.machinesSwitch = true;
  }

  selectAllMachines() {
    this.selectedAllMachines = !this.selectedAllMachines;

    if (this.selectedAllMachines) {
      this.machineSelected = this.machineList;
    } else {
      this.machineSelected = [];
    }
  }

  checkMachine(machine) {
    return this.machineSelected.find((m) => machine == m);
  }

  selectMachine(machine, event) {
    let _machineList = [];
    if (event == false) {
      _machineList = this.machineSelected.filter((_machine) => {
        return _machine.machine != machine.machine;
      });

      console.log(_machineList);

      this.machineSelected = _machineList;
    } else {
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

  cleanMachines(event) {
    event.preventDefault();
    this.machineSelected = [];
  }

  backToForm(event) {
    event.preventDefault();
    this.machinesSwitch = false;
  }

  onSubmit() {
    this.filterOpen = false;
    this.loadChart = true;
    this.setScrapData();
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
