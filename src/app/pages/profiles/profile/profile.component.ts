import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AppMessages } from '@core/utils/app-messages';
import { ResultCode } from 'app/proxy/enums';
import { ActivatedRoute, Router } from '@angular/router';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { FactoriesComponent } from '@core/shared/catalogs/factories/factories.component';
import { UserTypeComponent } from '@core/shared/catalogs/userType/userType.component';

import { ProfileService } from 'app/proxy/roles';
import { UserTypeService } from 'app/proxy/user-types';
import { FactoryService } from 'app/proxy/factories';

import { ProfilingService } from 'app/proxy/profilings';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  title: string = 'Registrar Perfil';
  factoryDataSource: any;
  profilesDataSource: any;
  warehouseDataSource: any;
  factorySelected: any;
  form: FormGroup;
  formState: FormGroup;
  isFormChange: boolean = true;
  factories: any = [];
  warehouses: any = [];
  indicators: any = [];
  factoriesArray: any = [];

  appMessage = new AppMessages();
  isEdit = false;
  profileId: any;
  profileData: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private woodDialogService: WoodDialogService,
    private factoryService: FactoryService,
    private userTypeService: UserTypeService,
    private profiingService: ProfilingService
  ) {
    this.isEdit = this.router.url.includes('/profiles/edit');
  }

  ngOnInit(): void {
    this.initForm();
    this.getFactories();
    this.getProfiles();
  }

  profileNew(event) {
    const options = { width: '300px' };
    this.woodDialogService
      .openComponent(UserTypeComponent, options)
      .then((result) => {
        if (result) {
          this.getProfiles();
          console.log(result);
        }
      });
  }

  public reciveFormData(event, factoryId) {
    let _factory: any;
    const pThis = this;

    if (this.isEdit) {
      const _factoriesArray = [];
      this.profileData.factories.map((f) => {
        const _dummyFact = this.form.controls['dummyFactories'].value.find(
          (fa) => fa.id == f.factoryId
        );

        console.log(_dummyFact);

        if (_dummyFact) {
          console.log('Entra');
          _factoriesArray.push({
            factoryId: f.factoryId,
            warehouses: f.warehouses,
          });
        }
      });

      this.factoriesArray = _factoriesArray;
    }
    if (
      pThis.factoriesArray.find((factory) => factory.factoryId == factoryId)
    ) {
      _factory = Object.keys(pThis.factoriesArray).filter(function (key) {
        return pThis.factoriesArray[key].factoryId == factoryId;
      });

      if (this.isEdit) {
        const _warehouse = this.factoriesArray[_factory[0]].warehouses.find(
          (w) => w.warehouseId == event[0].warehouseId
        );
        if (_warehouse) {
          const _warehouse = Object.keys(
            this.factoriesArray[_factory[0]].warehouses
          ).filter(function (key) {
            return (
              pThis.factoriesArray[_factory[0]].warehouses[key].warehouseId ==
              event[0].warehouseId
            );
          });
          this.factoriesArray[_factory[0]].warehouses[_warehouse[0]] = event[0];
        } else {
          this.factoriesArray[_factory[0]].warehouses.push(event[0]);
        }
      } else {
        this.factoriesArray[_factory[0]].warehouses = event;
      }
    } else {
      this.factoriesArray.push({
        factoryId,
        warehouses: event,
      });
    }

    if (this.isEdit) {
      const _profileData = this.profileData;
      for (let i = 0; _profileData.factories.length > i; i++) {
        if (_profileData.factories[i].factoryId == factoryId) {
          const _factory = this.factoriesArray.find(
            (f) => f.factoryId == factoryId
          );
          _profileData.factories[i].warehouses = _factory.warehouses;
        }
      }
    }

    this.form.controls['factories'].setValue(this.factoriesArray);
  }

  public factoryNew(event) {
    event.preventDefault();
    const options = { width: '300px' };
    this.woodDialogService
      .openComponent(FactoriesComponent, options)
      .then((result) => {
        if (result) {
          this.getFactories();
          console.log(result);
        }
      });
  }

  onProfileChange(event) {
    console.log(event);
  }

  onFactoryChange(event) {
    this.factories = event.value.map((factory) => {
      if (this.isEdit) {
        const _factoriesArray = [];
        this.profileData.factories.map((f) => {
          if (f.factoryId == factory.id) {
            _factoriesArray.push({
              factoryId: f.factoryId,
              warehouses: f.warehouses,
            });
          }
        });
        console.log(_factoriesArray);
        this.factoriesArray = _factoriesArray;

        this.form.controls['factories'].setValue(this.factoriesArray);
      }
      return {
        id: factory.id,
        name: factory.name,
      };
    });
  }

  onWarehouseChange(event) {
    this.warehouses = event.value;
  }

  onIndicatorsChange(event) {
    this.indicators = event.value;
  }

  public onSubmit() {
    const form = this.form;
    console.log(form.value);
    form.removeControl('dummyFactories');
    if (this.isEdit) form.controls['profileId'].patchValue(this.profileId);
    if (this.form.valid) {
      if (!this.isEdit) {
        this.profiingService
          .insert(form.value)
          .toPromise()
          .then((result) => {
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                this.router.navigate(['/profiles']);
              }
            });
          })
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
      } else {
        this.profiingService
          .update(form.value)
          .toPromise()
          .then((result) => {
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                this.router.navigate(['/profiles']);
              }
            });
          })
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
        console.log(this.form.value);
      }
    }
  }

  public getWarehousesByFactory(factoryId) {
    if (this.isEdit) {
      const factory = this.profileData.factories.find(
        (f) => f.factoryId == factoryId
      );

      if (factory) {
        return factory.warehouses;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  //#region PRIVATE METHODS

  private checkIsEdit() {
    if (this.isEdit) {
      this.title = 'Editar Perfil';
      const routeParams = this.route.snapshot.paramMap;
      const _profileId = routeParams.get('id');
      this.profileId = _profileId;
      this.getProfileFromId();
    }
  }

  private getProfileFromId() {
    this.profiingService
      .getByProfileId(this.profileId)
      .toPromise()
      .then((result) => {
        this.profileData = result || [];
        this.setFactoriesIsEdit(result.factories);
        this.form.controls['name'].setValue(this.profileData.profileName);
        this.form.controls['userTypeId'].setValue(this.profileData.userTypeId);
      });
  }

  private setFactoriesIsEdit(factories) {
    const pthis = this;
    const _factoriesObject = factories.map((factory) => {
      const _factoryObject = this.factoryDataSource.find(
        (f) => f.id == factory.factoryId
      );
      return _factoryObject;
    });

    this.factories = _factoriesObject;
    this.form.controls['dummyFactories'].setValue(this.factories);
  }

  private initForm() {
    if (!this.isEdit) {
      this.form = this.fb.group({
        name: new FormControl('', [Validators.required]),
        userTypeId: new FormControl('', [Validators.required]),
        factories: new FormControl('', [Validators.required]),
        dummyFactories: new FormControl(''),
      });
    } else {
      this.form = this.fb.group({
        profileId: new FormControl(''),
        name: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        userTypeId: new FormControl({ value: '', disabled: true }, [
          Validators.required,
        ]),
        factories: new FormControl('', [Validators.required]),
        dummyFactories: new FormControl(''),
      });
    }
  }

  private getFactories() {
    this.factoryService
      .getList()
      .toPromise()
      .then((result) => {
        this.factoryDataSource = result || [];
        this.checkIsEdit();
      })
      .catch();
  }

  private getProfiles() {
    this.userTypeService
      .getList()
      .toPromise()
      .then((result) => {
        this.profilesDataSource = result || [];
      })
      .catch();
  }
}
