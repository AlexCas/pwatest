import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataGridColumn } from '@core/shared/data-grid/data-grid.model';
import {
  DeviceRequestDto,
  DeviceService,
  UpdateDeviceStatusDto,
} from 'app/proxy/devices';
import { FactoryService } from 'app/proxy/factories';
import { WarehouseService } from 'app/proxy/warehouses';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  //#region ATTRIBUTES
  title: string = 'Administración de Dispositivos';
  devices = [];
  noResultText: string = NO_RESULT_TEXT
  pageSizeOptions: any[] = pageSizeOptions
  objFilter: any = {};
  query: any = { pageSize: 5, pageIndex: 0 }
  length: number = 0;
  factoryDataSource: any[] = [];
  warehouseDataSource: any[] = [];

  columns: DataGridColumn[] = [
    { header: 'ID', field: 'sId' },
    { header: 'Nombre', field: 'name' },
    { header: 'IP', field: 'ipAddress' },
    { header: 'Planta', field: 'factoryName' },
    { header: 'Nave', field: 'warehouseName' },
    { header: 'Estatus', field: 'status' },
    { header: '', field: 'isActive' },
  ];
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private deviceService: DeviceService,
    private factoryService: FactoryService,
    private warehouseService: WarehouseService,
    private woodDialogService: WoodDialogService,
    private cdr: ChangeDetectorRef
  ) { }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.getData();
    this.getFactories();
  }

  public onFactoryChange(event) {
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.objFilter.factoryId = value;
      this.getData();
      this.getWarehousesByFactoryId(value);
    }
  }

  public onWarehouseChange(event) {
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.objFilter.warehouseId = value;
      this.getData();
    }
  }

  public updateStatus(event, device) {
    const options = {
      title: device?.isActive
        ? '¿Activar Dispositivo'
        : '¿Inactivar Dispositivo?',
      message: device?.isActive
        ? '¿Desea activar el dispositivo?'
        : '¿Desea inactivar el dispositivo?',
    };

    this.woodDialogService.confirm(options).then((dlgResult) => {
      if (dlgResult) {
        const param: UpdateDeviceStatusDto = {
          id: device?.id,
          isActive: device?.isActive,
        };

        this.deviceService
          .updateDeviceStatus(param)
          .toPromise()
          .then((result) => {
            this.woodDialogService.handleResult(result);
          })
          .catch((error) => {
            this.woodDialogService.handleError(error);
          });
      } else {
        event.source.checked = !event.source.checked;
      }
    });
  }

  public onFilterChange(value: number = null) {
    this.objFilter.isActive = null;
    switch (value) {
      case 0:
        this.objFilter.isActive = false;
        break;
      case 1:
        this.objFilter.isActive = true;
        break;
    }

    this.getData();
  }

  public onSearch() {
    this.getData();
  }
  //#endregion

  //#region PRIVATE METHODS
  private getData() {
    const param: DeviceRequestDto = {};

    if (this.objFilter) {
      if (this.objFilter.factoryId) {
        param.factoryId = this.objFilter.factoryId;
      }
      if (this.objFilter.warehouseId) {
        param.warehouseId = this.objFilter.warehouseId;
      }
      if (this.objFilter.searchTerm) {
        param.name = this.objFilter.searchTerm;
      }

      param.isActive = this.objFilter.isActive;
    }

    this.deviceService
      .getList(param)
      .toPromise()
      .then((result) => {
        this.devices = result || [];
        this.length = this.devices.length
        this.cdr.detectChanges();
      })
      .catch();
  }

  private getFactories() {
    this.factoryService
      .getList()
      .toPromise()
      .then((result) => {
        this.factoryDataSource = result || [];
      })
      .catch();
  }

  private getWarehousesByFactoryId(factorySelected) {
    this.warehouseService
      .getListByFactoryId(factorySelected)
      .toPromise()
      .then((result) => {
        this.warehouseDataSource = result || [];
        console.log(this.warehouseDataSource);
      })
      .catch();
  }
  //#endregion
}
