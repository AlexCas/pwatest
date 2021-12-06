import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryService } from 'app/proxy/factories';
import { WarehouseService } from 'app/proxy/warehouses';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { WarehousesComponent } from '@core/shared/catalogs/warehouses/warehouses.component';
import { FactoriesComponent } from '@core/shared/catalogs/factories/factories.component';
import { DeviceService, CreateUpdateDeviceDto } from 'app/proxy/devices';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AppMessages } from '@core/utils/app-messages';
import { ResultCode } from 'app/proxy/enums';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  //#region ATTRIBUTES
  title: string = 'Registrar Dispositivo';
  factoryDataSource: any[] = [];
  factorySelected: string;
  warehouseDataSource: any[] = [];
  warehouseSelected: string;
  appMessage = new AppMessages();
  isEdit = false;
  deviceId: string;
  device: any;
  form: FormGroup;
  formState: FormGroup;
  isFormChange: boolean = true;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private fb: FormBuilder,
    private factoryService: FactoryService,
    private route: ActivatedRoute,
    private router: Router,
    private warehouseService: WarehouseService,
    private woodDialogService: WoodDialogService,
    private deviceService: DeviceService
  ) {}
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.isEditOrNew();
    this.getFactories();
    this.formInit();
  }

  public onFactoryChange(event) {
    //this.isEqual();
    console.log('Factorychange?');
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.factorySelected = value;
      this.getWarehousesByFactoryId();
      if (this.isEdit) {
        this.form.patchValue({
          warehouseId: '',
        });
        this.isEqual();
        this.warehouseSelected = '';
      }
    }
  }
  //#endregion

  public onSubmit() {
    if (this.form.valid) {
      const values: CreateUpdateDeviceDto = this.form.value;
      console.log(values);
      if (this.isEdit) {
        this.deviceService
          .update(values)
          .toPromise()
          .then((result) =>
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                this.router.navigate(['/devices']);
              }
            })
          )
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
      } else {
        this.deviceService
          .insert(values)
          .toPromise()
          .then((result) =>
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                this.router.navigate(['/devices']);
              }
            })
          )
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
      }
    }
  }

  //#region PRIVATE METHODS
  private getFactories() {
    this.factoryService
      .getList()
      .toPromise()
      .then((result) => {
        this.factoryDataSource = result || [];
      })
      .catch();
  }

  public wareHouseNew(event) {
    event.preventDefault();
    const options = {
      width: '300px',
      data: { factoryId: this.factorySelected },
    };
    this.woodDialogService
      .openComponent(WarehousesComponent, options)
      .then((result) => {
        if (result) {
          this.getWarehousesByFactoryId();
          this.isEqual();
        }
      });
  }

  public factoryNew(event) {
    event.preventDefault();
    const options = { width: '300px' };
    this.woodDialogService
      .openComponent(FactoriesComponent, options)
      .then((result) => {
        if (result) {
          this.getFactories();
          this.isEqual();
          this.warehouseSelected = '';
          this.form.patchValue({
            warehouseId: '',
          });
        }
      });
  }

  private getWarehousesByFactoryId() {
    this.warehouseService
      .getListByFactoryId(this.factorySelected)
      .toPromise()
      .then((result) => {
        this.warehouseDataSource = result || [];
      })
      .catch();
  }

  private getDeviceFromId() {
    this.deviceService
      .get(this.deviceId)
      .toPromise()
      .then((result) => {
        this.device = result || [];
        console.log(this.device);
        this.factorySelected = result.factoryId;
        this.getWarehousesByFactoryId();
        this.form = this.fb.group({
          id: result.id,
          bId: result.bId,
          sId: new FormControl({ value: result.sId, disabled: true }),
          name: new FormControl({ value: result.name, disabled: true }),
          ipAddress: new FormControl(result.ipAddress, [Validators.required]),
          factoryId: new FormControl(result.factoryId, [Validators.required]),
          factoryName: result.factoryName,
          warehouseId: new FormControl(result.warehouseId, [
            Validators.required,
          ]),
          warehouseName: result.warehouseName,
          isActive: new FormControl(result.isActive, [Validators.required]),
          comment: result.comment,
        });
        this.formState = this.form.value;
      });
  }

  private formInit() {
    this.form = this.fb.group({
      bId: '',
      sId: new FormControl({ value: '', disabled: true }),
      name: new FormControl({ value: '', disabled: true }),
      ipAddress: new FormControl('', [Validators.required]),
      factoryId: new FormControl('', [Validators.required]),
      factoryName: '',
      warehouseId: new FormControl('', [Validators.required]),
      warehouseName: '',
      isActive: new FormControl(true, [Validators.required]),
      comment: '',
    });
  }

  private isEditOrNew() {
    this.isEdit = this.router.url.includes('/devices/edit');

    if (this.isEdit) {
      this.title = 'Editar Dispositivo';
      const routeParams = this.route.snapshot.paramMap;
      const _deviceId = routeParams.get('id');
      this.deviceId = _deviceId;
      this.getDeviceFromId();
    }
  }

  public isEqual() {
    this.isFormChange =
      JSON.stringify(this.formState.value) === JSON.stringify(this.form.value);
    console.log(this.form.invalid || !this.isFormChange);
  }
  //#endregion
}
