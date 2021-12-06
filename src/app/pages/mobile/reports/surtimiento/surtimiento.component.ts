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
import { PendingSupplyService } from 'app/proxy/reports/pending-supply.service';
import { SuppliesService } from 'app/services/reports/supplies/supplies.service';
import { AuthService } from 'app/pages/auth/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-surtimiento',
  templateUrl: './surtimiento.component.html',
  styleUrls: ['./surtimiento.component.scss'],
})
export class SurtimientoMobileComponent implements OnInit {
  reportName: string = "Surtimiento de Materiales";
  suppliesData: any;
  Highcharts: typeof Highcharts = Highcharts;

  filterOpen = false;

  chartOptionsSupplies: any;

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
  folioSwitch: boolean = false;
  orderSwitch: boolean = false;
  orderParentSwitch: boolean = false;
  childSwitch: boolean = false;

  factorySelected: any;

  machineList: any;
  machineSelected: any = [];

  folioList: any;
  folioSelected: any = [];

  orderList: any;
  orderSelected: any = [];

  parentList: any;
  parentSelected: any = [];

  childList: any;
  childSelected: any = [];

  selectedAllMachines: boolean = false;
  selectedAllFolios: boolean = false;
  selectedAllOrders: boolean = false;
  selectedAllParent: boolean = false;
  selectedAllChild: boolean = false;

  suppliesPendingChecked = true;

  landscape = window.matchMedia('(orientation: landscape)');
  messageError: string = "No se encontraron registros";
  columns: DataGridColumn[] = [
    { header: 'Nave', field: 'name' },
    { header: 'Folio Solicitud', field: 'folio' },
    { header: 'No. de Orden', field: 'order' },
    { header: 'No. Parte Padre', field: 'itemNumFather' },
    { header: 'Descripción de Parte Padre', field: 'itemNumFatherDescr' },
    { header: 'Máquina', field: 'machine' },
    { header: 'No. Parte Comp.', field: 'itemNumComp' },
    { header: 'Descripción Parte Componente', field: 'itemNumCompDescr' },
    { header: 'Cantidad Requerida', field: 'totalRequested' },
    { header: 'Cantidad Surtida', field: 'totalSupplied' },
    { header: 'Cantidad por Surtir', field: 'totalPending' },
  ];
  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private profilingService: ProfilingService,
    private pendingSupplyService: PendingSupplyService,
    private suppliesService: SuppliesService,
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
    /*if (!this.authService.getIndicatorsByUser('Surtimiento de Materiales')){
      this.router.navigateByUrl('/dashboard');
    }*/
    this.getPermissions();    
  }

  loadChart() {
    this.chartOptionsSupplies = this.suppliesService.setOptionsSuppliesMobile(
      this.suppliesData.warehouses[0]
    );
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
        this.messageError = "No se encontraron registros";
        this.rolePermissionsData = result[0];
        this.form.controls['factoryId'].patchValue(
          this.rolePermissionsData.factories[0]          
        );
        const hasPemit = this.checkIfProfileCanViewReport(this.rolePermissionsData.factories[0]);
        console.log(`Este perfil ${hasPemit ? 'tiene' : 'no tiene'} permisos para ver este reporte.`)
        this.factorySelected = this.rolePermissionsData.factories[0];
        this.sortWarehouses();
        this.form.controls['warehouseId'].patchValue(
          this.rolePermissionsData.factories[0].warehouses[0].warehouseId
        );
        if (this.checkIfProfileCanViewReport(this.form.value.factoryId)){
          this.setSuppliesData();
        }        
      });
  }

  checkIfProfileCanViewReport(factory){
    let permission = false;
    factory.warehouses.map(w => {
      w.indicators.map(i => {
        if (this.reportName == i.name){          
          permission = true;
        }
      })
    });

    if (!permission){
      this.messageError = "No tienes permisos para ver esta información.";
    }

    return permission;
  }

  onWarehouseChange() {
    this.getMachineList();
    this.getFolioList();
    this.getOrderList();
    this.getParentList();
    this.getChildList();
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
    this.pendingSupplyService
      .getListMachines(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.machineList = result;
      });
  }

  getFolioList() {
    const form = this.form.value;
    this.pendingSupplyService
      .getListFolios(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.folioList = result;
      });
  }

  getOrderList() {
    const form = this.form.value;
    this.pendingSupplyService
      .getListOrders(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.orderList = result;
      });
  }

  getParentList() {
    const form = this.form.value;
    this.pendingSupplyService
      .getListItemsFather(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.parentList = result;
      });
  }

  getChildList() {
    const form = this.form.value;
    this.pendingSupplyService
      .getListItemsComponent(form.factoryId.factoryId, form.warehouseId)
      .toPromise()
      .then((result) => {
        this.childList = result;
      });
  }

  setSuppliesData() {
    const _form = this.form.value;
    const _data = {
      factory: '',
      pendingSupplies: [],
      warehouses: [],
    };
    this.suppliesData = _data;
    
    this.pendingSupplyService
      .post({
        folios: this.folioSelected,
        orders: this.orderSelected,
        itemsF: this.parentSelected,
        itemsC: this.childSelected,
        machines: this.machineSelected,
        factoryId: _form.factoryId.factoryId,
        warehouseId: _form.warehouseId,
        startDate: _form.startDate
          ? moment(_form.startDate).format('YYYY-MM-DD')
          : null,
        endDate: _form.endDate
          ? moment(_form.endDate).format('YYYY-MM-DD')
          : null,
      })
      .toPromise()
      .then((result) => {
        console.log(result);
        if (result.factory) {
          if (this.machineSelected.length == 0) {
            this.getMachineList();
          }
          if (this.folioSelected.length == 0) {
            this.getFolioList();
          }
          if (this.orderSelected.length == 0) {
            this.getOrderList();
          }
          if (this.parentSelected.length == 0) {
            this.getParentList();
          }
          if (this.childSelected.length == 0) {
            this.getChildList();
          }
          this.suppliesData = result;
          this.loadChart();
        }
      });
  }

  onFactoryChange(event) {
    const { value, selected } = event.source;
    console.log(value);
    this.factorySelected = value;
  }

  switchMachine() {
    this.machinesSwitch = true;
  }

  switchFolio() {
    this.folioSwitch = true;
  }

  switchOrder() {
    this.orderSwitch = true;
  }

  switchParent() {
    this.orderParentSwitch = true;
  }

  switchChild() {
    this.childSwitch = true;
  }

  cleanValues(event) {
    event.preventDefault();
    this.machineSelected = [];
    this.folioSelected = [];
    this.orderSelected = [];
    this.parentSelected = [];
    this.childSelected = [];
    this.filterOpen = false;

    this.getPermissions();
  }

  onSubmit() {
    this.filterOpen = false;

    console.log(this.filterOpen);
    this.setSuppliesData();
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

  checkMachine(machine) {
    return this.machineSelected.find((m) => machine == m);
  }

  selectAllMachines() {
    this.selectedAllMachines = !this.selectedAllMachines;

    if (this.selectedAllMachines) {
      this.machineSelected = this.machineList;
    } else {
      this.machineSelected = [];
    }
  }

  cleanMachines(event) {
    event.preventDefault();
    this.machineSelected = [];
  }

  //Folios

  cleanFolios(event) {
    event.preventDefault();
    this.folioSelected = [];
  }

  selectFolios2(folio, event){
    let _folioList = [];
    if (event == false){
      _folioList = this.folioSelected.filter(_folio => {        
        return _folio != folio;
      });

      console.log(_folioList);

      this.folioSelected = _folioList;
    }else {
      this.folioSelected.push(folio);
    }
  }

  selectFolios(folio, event) {
    const _folioList = [];

    console.log(this.folioList.length);
    for (let i = 0; this.folioList.length >= i; i++) {
      if (this.folioList[i] == folio && !event) {
        if (this.machineList[i - 1]) {
          _folioList.push(this.machineList[i - 1]);
        }
        break;
      } else if (this.folioList[i] == folio) {
        _folioList.push(this.folioList[i]);
        break;
      } else {
        _folioList.push(this.folioList[i]);
      }
    }

    this.folioSelected = _folioList;
  }

  checkFolios(folio) {
    return this.folioSelected.find((m) => folio == m);
  }

  selectAllFolios() {
    this.selectedAllFolios = !this.selectedAllFolios;

    if (this.selectedAllFolios) {
      this.folioSelected = this.folioList;
    } else {
      this.folioSelected = [];
    }
  }

  //Orders

  cleanOrders(event) {
    event.preventDefault();
    this.orderSelected = [];
  }

  selectOrders2(order, event){
    let _orderList = [];
    if (event == false){
      _orderList = this.orderSelected.filter(_order => {        
        return _order != order;
      });

      console.log(_orderList);

      this.orderSelected = _orderList;
    }else {
      this.orderSelected.push(order);
    }
  }

  selectOrders(order, event) {
    const _orderList = [];

    console.log(this.orderList.length);
    for (let i = 0; this.orderList.length >= i; i++) {
      if (this.orderList[i] == order && !event) {
        if (this.machineList[i - 1]) {
          _orderList.push(this.machineList[i - 1]);
        }
        break;
      } else if (this.orderList[i] == order) {
        _orderList.push(this.orderList[i]);
        break;
      } else {
        _orderList.push(this.orderList[i]);
      }
    }

    this.orderSelected = _orderList;
  }

  checkOrders(order) {
    return this.orderSelected.find((m) => order == m);
  }

  selectAllOrders() {
    this.selectedAllOrders = !this.selectedAllOrders;

    if (this.selectedAllOrders) {
      this.orderSelected = this.orderList;
    } else {
      this.orderSelected = [];
    }
  }

  // Order Parent

  cleanParent(event) {
    event.preventDefault();
    this.parentSelected = [];
  }

  selectParent2(parent, event){
    let _parentList = [];
    if (event == false){
      _parentList = this.parentSelected.filter(_parent => {        
        return _parent != parent;
      });

      console.log(_parentList);

      this.parentSelected = _parentList;
    }else {
      this.parentSelected.push(parent);
    }
  }

  selectParent(parent, event) {
    const _parentList = [];

    console.log(this.parentList.length);
    for (let i = 0; this.parentList.length >= i; i++) {
      if (this.parentList[i] == parent && !event) {
        if (this.machineList[i - 1]) {
          _parentList.push(this.machineList[i - 1]);
        }
        break;
      } else if (this.parentList[i] == parent) {
        _parentList.push(this.parentList[i]);
        break;
      } else {
        _parentList.push(this.parentList[i]);
      }
    }

    this.parentSelected = _parentList;
  }

  checkParent(parent) {
    return this.parentSelected.find((m) => parent == m);
  }

  selectAllParent() {
    this.selectedAllParent = !this.selectedAllParent;

    if (this.selectedAllParent) {
      this.parentSelected = this.parentList;
    } else {
      this.parentSelected = [];
    }
  }

  // Child Component

  cleanChild(event) {
    event.preventDefault();
    this.childSelected = [];
  }

  selectChild2(child, event){
    let _childList = [];
    if (event == false){
      _childList = this.childSelected.filter(_child => {        
        return _child != child;
      });

      console.log(_childList);

      this.childSelected = _childList;
    }else {
      this.childSelected.push(child);
    }
  }

  selectChild(child, event) {
    const _childList = [];

    for (let i = 0; this.childList.length >= i; i++) {
      if (this.childList[i] == child && !event) {
        if (this.machineList[i - 1]) {
          _childList.push(this.machineList[i - 1]);
        }
        break;
      } else if (this.childList[i] == child) {
        _childList.push(this.childList[i]);
        break;
      } else {
        _childList.push(this.childList[i]);
      }
    }

    this.childSelected = _childList;
  }

  checkChild(child) {
    return this.childSelected.find((m) => child == m);
  }

  selectAllChild() {
    this.selectedAllChild = !this.selectedAllChild;

    if (this.selectedAllChild) {
      this.childSelected = this.childList;
    } else {
      this.childSelected = [];
    }
  }

  backToForm(event) {
    event.preventDefault();
    this.machinesSwitch = false;
    this.folioSwitch = false;
    this.orderSwitch = false;
    this.orderParentSwitch = false;
    this.childSwitch = false;
  }

  private formInit() {
    this.form = this.fb.group({
      folios: new FormControl(''),
      orders: new FormControl(''),
      itemsF: new FormControl(''),
      itemsC: new FormControl(''),
      machines: new FormControl(''),
      factoryId: new FormControl(''),
      warehouseId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
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
}
