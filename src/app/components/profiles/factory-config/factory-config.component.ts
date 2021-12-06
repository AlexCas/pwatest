import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppMessages } from '@core/utils/app-messages';
import { IndicatorService } from 'app/proxy/indicators';
import { WarehouseService } from 'app/proxy/warehouses';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { WarehousesComponent } from '@core/shared/catalogs/warehouses/warehouses.component';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-factory-config',
  templateUrl: './factory-config.component.html',
  styleUrls: ['./factory-config.component.scss'],
})
export class FactoryConfigComponent implements OnInit {
  @Input() factory: any;
  @Input() isEdit: any = false;
  @Input() isEditData: any = null;
  @Output() formData: any = new EventEmitter<any>();
  @Output() isWarehouseValid: any = new EventEmitter<any>();

  factoryName: string;
  appMessage = new AppMessages();
  warehouseDataSource: any;
  indicatorDataSource: any;
  form: FormGroup;
  formState: FormGroup;
  selectedWarehouses: any;
  selectedIndicators: any;

  dummyWarehouses: any;
  dummyIndicators: any;

  edit: boolean = false;

  indicatorsPreparedToOut: any = [];

  constructor(
    private warehouseService: WarehouseService,
    private indicatorService: IndicatorService,
    private fb: FormBuilder,
    private woodDialogService: WoodDialogService
  ) {}

  ngOnInit(): void {
    this.factoryName = this.factory.name;
    this.getWarehousesByFactoryId();
    this.getIndicatorList();
  }

  public wareHouseNew(event) {
    event.preventDefault();
    const options = {
      width: '300px',
      data: { factoryId: this.factory.id },
    };
    this.woodDialogService
      .openComponent(WarehousesComponent, options)
      .then((result) => {
        if (result) {
          this.getWarehousesByFactoryId();
        }
      });
  }

  onWarehouseChange(event) {
    this.selectedWarehouses = event.value;

    this.isWarehouseValid.emit(false);
  }

  checkIsEdit() {
    if (this.isEditData) {
      const pthis = this;
      this.dummyWarehouses = this.isEditData.map((e) => {
        const _warehouse = pthis.warehouseDataSource.find(
          (w) => w.id == e.warehouseId
        );

        return _warehouse;
      });
      this.selectedWarehouses = this.dummyWarehouses;
    }
  }

  getIndicators(warehouseId) {   
    const _warehouse = this.isEditData.find(
      (e) => e.warehouseId == warehouseId
    );
    if (_warehouse) {
      return _warehouse.indicators.map((i) => (i?.id ? i.id : i));
    } else {
      return '';
    }
  }

  onIndicatorsChange(event, warehouse) {
    if (this.isEditData){
      const _warehouse = this.isEditData.find(
        (e) => e.warehouseId == warehouse.id
      );
      if (_warehouse) {
        const _indicatorsList = [];
        event.value.map((e) => {
          const indicator = _warehouse.indicators.find((i) => i.id == e);
          if (indicator) {
            _indicatorsList.push(indicator);
          }else {
            _indicatorsList.push({ id: e })
          }
        });      
  
        this.selectedIndicators = _indicatorsList;
      } else {
        const _indicatorsList = [];
        event.value.map((e) => {
          _indicatorsList.push({ id: e })
        });   

        console.log(_indicatorsList);

        this.selectedIndicators = _indicatorsList;
      }
    }else {
      this.selectedIndicators = this.isEdit ? event.value.map(e => { return {id: e} }) : event.value;
    }

    this.setToIndicatorArray({
      warehouseId: warehouse.id,
      indicators: this.selectedIndicators,
    });

    this.edit = true;
  }

  //#region for Private methods

  private setToIndicatorArray(indicatorArray) {
    let _indicator: any;
    const pThis = this;

    console.log(this.indicatorsPreparedToOut);
    
    if (
      pThis.indicatorsPreparedToOut.find(
        (ind) => ind.warehouseId == indicatorArray.warehouseId
      )
    ) {
      _indicator = Object.keys(pThis.indicatorsPreparedToOut).filter(function (
        key
      ) {
        return (
          pThis.indicatorsPreparedToOut[key].warehouseId ==
          indicatorArray.warehouseId
        );
      });
      this.indicatorsPreparedToOut[_indicator[0]].indicators =
        indicatorArray.indicators;
    } else {
      this.indicatorsPreparedToOut.push(indicatorArray);
    }

    this.formData.emit(this.indicatorsPreparedToOut);
  }

  private getWarehousesByFactoryId() {
    this.warehouseService
      .getListByFactoryId(this.factory.id)
      .toPromise()
      .then((result) => {
        this.warehouseDataSource = result || [];
        this.checkIsEdit();
      })
      .catch();
  }

  private getIndicatorList() {
    this.indicatorService
      .getList()
      .toPromise()
      .then((result) => {
        this.indicatorDataSource = result || [];
      });
  }
}
