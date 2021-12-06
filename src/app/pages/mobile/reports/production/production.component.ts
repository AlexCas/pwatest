import { Component, OnInit } from '@angular/core';
import { PlanProductionService } from 'app/proxy/reports/plan-production.service';
import { ProductionService } from 'app/services/reports/production/production.service';
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
import 'moment/locale/es';

moment.locale('es');

@Component({
  selector: 'app-mobile-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.scss'],
})
export class ProductionMobileComponent implements OnInit {
  ip: string = '134.234.422.12';

  Highcharts: typeof Highcharts = Highcharts;

  filterOpen = false;

  appMessage = new AppMessages();
  form: FormGroup;

  roleName: string;
  rolePermissionsData: any;

  machinesSwitch: boolean = false;
  ordersSwitch: boolean = false;
  itemSwitch: boolean = false;

  factorySelected: any;

  machineList: any;
  orderList: any;
  itemList: any;

  machineSelected: any = [];
  ordersSelected: any = [];
  itemsSelected: any = [];

  selectedAllMachines: boolean = false;
  selectedAllOrders: boolean = false;
  selectedAllItems: boolean = false;

  landscape = window.matchMedia('(orientation: landscape)');

  productionDataSource: any;
  productionWeekData: any;

  factory: any;
  warehouse: any;

  productionDayChart: Highcharts.Options;
  chartOptionsMonday: Highcharts.Options;
  chartOptionsTuesday: Highcharts.Options;
  chartOptionsWednesday: Highcharts.Options;
  chartOptionsThrusday: Highcharts.Options;
  chartOptionsFriday: Highcharts.Options;
  chartOptionsSaturday: Highcharts.Options;
  chartOptionsSunday: Highcharts.Options;

  //Table Variables

  machineOrders: any = [];
  query: any = { pageSize: 5, pageIndex: 0 };
  noResultText: string = NO_RESULT_TEXT;
  pageSizeOptions: any[] = pageSizeOptions;
  objFilter: any = {};
  length: number = 0;
  numberFormat: any;
  orders: any;
  showCarrousel: any;
  carouselConfig: boolean = false;
  reportName: string = 'Avance de Producción';

  columns: DataGridColumn[] = [
    { header: 'Máquina', field: 'machine' },
    { header: 'Fecha de Arranque', field: 'date' },
    { header: 'No. Orden', field: 'order' },
    { header: 'No. Parte', field: 'articleNumber' },
    { header: 'Descripción de Parte', field: 'description' },
    { header: 'Cantidad Planeada', field: 'orderedQuantity' },
    { header: 'Cantidad Producida', field: 'quantityCompleted' },
    { header: 'Cumplimiento por Orden', field: 'percentage' },
    { header: 'Cantidad por Completar', field: 'amountToBeCompleted' },
    { header: 'Tiempo Restante por Completar Orden', field: 'time' },
    { header: 'Tiempo Restante por Completar Piezas', field: 'timeP' },
    { header: 'Estatus de Molde', field: 'molde' },
  ];

  loadChart: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private planProductionService: PlanProductionService,
    private productionService: ProductionService,
    private profilingService: ProfilingService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.landscape.addEventListener('change', (ev) => {
      console.log('landscape orientation', this.landscape.matches);
    });
    /*document.addEventListener('gesturestart', function (e) {
      e.preventDefault();
    }); */

    /*if (!this.authService.getIndicatorsByUser('Avance de Producción')){
      this.router.navigateByUrl('/dashboard');
    }*/

    this.getPermissions();
    this.numberFormat = new Intl.NumberFormat('es-MX');
  }

  loadCharts() {
    this.productionDayChart =
      this.productionService.getOptionsForProductionDayMachineMobile(
        this.productionDataSource.warehouse.machinesA2
      );
    if (this.productionWeekData) {
      if (this.productionWeekData.find((prod) => prod.day == 'LUNES')) {
        this.chartOptionsMonday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'LUNES')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'MARTES')) {
        this.chartOptionsTuesday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'MARTES')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'MIERCOLES')) {
        this.chartOptionsWednesday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'MIERCOLES')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'JUEVES')) {
        this.chartOptionsThrusday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'JUEVES')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'VIERNES')) {
        this.chartOptionsFriday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'VIERNES')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'SABADO')) {
        this.chartOptionsSaturday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'SABADO')
          );
      }
      if (this.productionWeekData.find((prod) => prod.day == 'DOMINGO')) {
        this.chartOptionsSunday =
          this.productionService.getProductionWeekMobile(
            this.productionWeekData.find((prod) => prod.day == 'DOMINGO')
          );
      }
    }
  }

  getProductionData() {
    const form = this.form.value;
    this.planProductionService
      .post({
        machines: this.machineSelected,
        factoryId: form.factoryId.factoryId,
        warehouseId: form.warehouseId,
        startDate: form.startDate
          ? moment(form.startDate).format('YYYY-MM-DD')
          : null,
        endDate: form.endDate
          ? moment(form.endDate).format('YYYY-MM-DD')
          : null,
        orders: this.ordersSelected,
        items: this.itemsSelected,
      })
      .toPromise()
      .then((result) => {
        this.chartOptionsMonday = null;
        this.chartOptionsTuesday = null;
        this.chartOptionsWednesday = null;
        this.chartOptionsThrusday = null;
        this.chartOptionsFriday = null;
        this.chartOptionsSaturday = null;
        this.chartOptionsSunday = null;
        this.loadChart = false;
        this.productionDataSource = null;
        this.productionWeekData = null;
        this.productionDataSource = result;
        this.factory = this.productionDataSource.factory;
        this.warehouse = this.productionDataSource.warehouse.name;
        this.productionWeekData = this.productionDataSource.warehouse.semanales;
        this.setOrders();
        console.log('Week');
        console.log(this.productionWeekData);
        this.loadCharts();

        //load lists
        if (this.machineSelected.length == 0) {
          this.getMachineList();
        }
        if (this.ordersSelected.length == 0) {
          this.getOrderList();
        }
        if (this.itemsSelected.length == 0) {
          this.getItemList();
        }
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

  getPermissions() {
    const role = this.localStorageService.getUserData().role;
    if (!this.roleName) {
      this.roleName = role;
    }
    if(role == "Administrador"){
      this.showCarrousel = true;
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
        this.getProductionData();
      });
  }

  onWarehouseChange() {
    this.getMachineList();
    this.getOrderList();
    this.getItemList();
  }

  onFactoryChange(event) {
    const { value, selected } = event.source;
    this.factorySelected = value;
  }

  cleanValues(event) {
    event.preventDefault();
    this.filterOpen = false;
    this.loadChart = true;
    this.ordersSelected = [];
    this.itemsSelected = [];
    this.machineSelected = [];
    this.getPermissions();
  }

  onSubmit() {
    this.filterOpen = false;
    this.loadChart = true;
    this.getProductionData();
  }

  getMachineList() {
    const form = this.form.value;
    this.planProductionService
      .getListMachines(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.machineList = result;
      });
  }

  getOrderList() {
    const form = this.form.value;
    this.planProductionService
      .getListOrders(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.orderList = result;
      });
  }

  getItemList() {
    const form = this.form.value;
    this.planProductionService
      .getListItems(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.itemList = result;
      });
  }

  checkMachine(machine) {
    return this.machineSelected.find((m) => machine == m);
  }

  checkOrder(order) {
    return this.ordersSelected.find((o) => order == o);
  }

  checkItem(item) {
    return this.itemsSelected.find((i) => item == i);
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
    console.log(event);
    for (let i = 0; this.machineList.length >= i; i++) {
      if (this.machineList[i] == machine && !event) {
        if (this.itemList[i - 1]) {
          _machineList.push(this.itemList[i - 1]);
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

  selectOrder2(order, event) {
    let _orderList = [];
    if (event == false) {
      _orderList = this.ordersSelected.filter((_order) => {
        return _order != order;
      });

      console.log(_orderList);

      this.ordersSelected = _orderList;
    } else {
      this.ordersSelected.push(order);
    }
  }

  selectOrder(order, event) {
    const _orderList = [];
    for (let i = 0; this.orderList.length >= i; i++) {
      if (this.orderList[i] == order && !event) {
        if (this.itemList[i - 1]) {
          _orderList.push(this.itemList[i - 1]);
        }
        break;
      } else if (this.orderList[i] == order) {
        _orderList.push(this.orderList[i]);
        break;
      } else {
        _orderList.push(this.orderList[i]);
      }
    }

    this.ordersSelected = _orderList;
  }

  selectItem2(item, event) {
    let _itemList = [];
    if (event == false) {
      _itemList = this.itemsSelected.filter((_item) => {
        return _item != item;
      });

      console.log(_itemList);

      this.itemsSelected = _itemList;
    } else {
      this.itemsSelected.push(item);
    }
  }

  selectItem(item, event) {
    const _itemList = [];
    for (let i = 0; this.itemList.length >= i; i++) {
      if (this.itemList[i] == item && !event) {
        if (this.itemList[i - 1]) {
          _itemList.push(this.itemList[i - 1]);
        }
        break;
      } else if (this.itemList[i] == item) {
        _itemList.push(this.itemList[i]);
        break;
      } else {
        _itemList.push(this.itemList[i]);
      }
    }

    this.itemsSelected = _itemList;
  }

  backToForm(event) {
    event.preventDefault();
    this.machinesSwitch = false;
    this.ordersSwitch = false;
    this.itemSwitch = false;
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

  cleanOrders(event) {
    event.preventDefault();
    this.ordersSelected = [];
  }

  selectAllOrders() {
    this.selectedAllOrders = !this.selectedAllOrders;

    if (this.selectedAllOrders) {
      this.ordersSelected = this.orderList;
    } else {
      this.ordersSelected = [];
    }
  }

  selectAllItems() {
    this.selectedAllItems = !this.selectedAllItems;

    if (this.selectedAllItems) {
      this.itemsSelected = this.itemList;
    } else {
      this.itemsSelected = [];
    }
  }

  cleanItems(event) {
    event.preventDefault();
    this.itemsSelected = [];
  }

  switchMachine() {
    this.machinesSwitch = true;
  }

  switchOrders() {
    this.ordersSwitch = true;
  }

  switchItems() {
    this.itemSwitch = true;
  }

  getDataWeekFromService() {
    this.planProductionService
      .getR3ByIp(this.ip)
      .toPromise()
      .then((response) => {
        this.productionWeekData = response;
      });
  }

  private formInit() {
    this.form = this.fb.group({
      machines: new FormControl(''),
      factoryId: new FormControl(''),
      warehouseId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      orders: new FormControl(''),
      items: new FormControl(''),
    });
  }

  //Table Methods
  formatDate(date: string) {
    const _date = date.slice(0, 10);
    let _day = moment(_date).format('dddd');
    return `${_day.charAt(0).toUpperCase()}${_day.slice(1)} ${moment(
      _date
    ).format('DD/MM/YYYY')}`;
  }

  setOrders() {
    const _machineOrders = [];
    this.productionDataSource.warehouse.machinesA1.map((machine) => {
      //order.machine = machine.machine;
      _machineOrders.push(machine);
    });

    console.log(_machineOrders);

    this.machineOrders = _machineOrders;
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
}
