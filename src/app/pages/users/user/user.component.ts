import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadDownloadService } from '@core/services/file-upload-download.service';
import { DepartmentsComponent } from '@core/shared/catalogs/departments/departments.component';
import { FactoriesComponent } from '@core/shared/catalogs/factories/factories.component';
import { RegExps } from '@core/utils';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { environment } from '@env/environment';
import { LocalStorageService } from 'app/pages/auth/services/local-storage.service';
import { DepartmentService } from 'app/proxy/departments';
import { ResultCode } from 'app/proxy/enums';
import { FactoryService } from 'app/proxy/factories';
import { ProfileService } from 'app/proxy/roles';
import { SepomexService } from 'app/proxy/sepomex';
import { UserService } from 'app/proxy/users';
import { AuthService } from 'app/pages/auth/services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  //#region ATTRIBUTES
  title: string;
  form: FormGroup;
  user: any;
  loggedUser: any;
  defaultCountryId = 484;
  appMessage = new AppMessages();
  isEdit = false;
  isProfile = false;
  profileId: string;
  MAX_SIZE = 5000000;
  userAvatarUrl: string = '';
  factorySelected: string;

  mobileDepartment: string;
  mobileFactory: string;

  hasPermission: boolean = false;

  //Datasources
  factoryDataSource: any[] = [];
  departmentDataSource: any[] = [];
  userTypeDataSource: any[] = [];
  roleDataSource: any[] = [];
  countryDataSource: any[] = [];
  stateDataSource: any[] = [];
  townDataSource: any[] = [];
  zipCodeDataSource: any[] = [];
  neighborhoodDataSource: any[] = [];

  timeStamp: any;
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private factoryService: FactoryService,
    private departmentService: DepartmentService,
    private roleService: ProfileService,
    private sepomexService: SepomexService,
    private fileUploadDownloadService: FileUploadDownloadService,
    private userService: UserService,
    private woodDialogService: WoodDialogService,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {
    this.user = this.route?.snapshot?.data?.itemData;

    console.log(this.user);
    this.profileId = this.localStorageService.getUserId();
    this.timeStamp = new Date().getTime();
    this.isEditOrProfile();
  }
  //#endregion

  //#region PUBLIC METHODS
  ngOnInit() {
    this.loggedUser = this.authService.getUser();

    console.log(this.loggedUser);

    if (this.isEdit && this.loggedUser.role) {
      if (this.loggedUser.role != 'Administrador') {
        this.hasPermission = false;
      } else {
        this.hasPermission = true;
      }
    }

    if (!this.hasPermission) {
      this.formInitNoPermission();
    } else {
      this.formInit();
    }
    this.getFactories();
    this.getCountries();
    this.getStates(this.defaultCountryId);
    this.getRoles();
    this.getUserType();
  }

  public validateFactoryAndDepartment() {
    console.log(this.form.valid);
    console.log(this.form.value);
  }

  public onFactoryChange(event, manualChange: boolean = false) {
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.factorySelected = value;
      if (event.isUserInput) {
        this.form.patchValue({
          departmentId: '',
        });
      }

      this.getDepartments(this.factorySelected);
    }
  }

  public onSubmit() {
    if (this.form.valid) {
      const value = this.form.value;
      console.log('value', value);
      if (value && value.address && !value.address.stateId) {
        // value.address = null;
      }

      if (this.isEdit) {
        this.userService
          .updateUser(value)
          .toPromise()
          .then((result) => {
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                if (this.isEdit && !this.isProfile) {
                  this.router.navigate(['/users']);
                } else if (this.isProfile) {
                  this.router.navigate(['/']);
                }
              }
            });
          })
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
      } else {
        this.userService
          .register(value)
          .toPromise()
          .then((result) => {
            this.woodDialogService.handleResult(result).then(() => {
              if (result.resultCode === ResultCode.Success) {
                this.router.navigate(['/users']);
              }
            });
          })
          .catch((error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          });
      }
    }
  }

  public onCountryChange(value: any) {
    this.getStates(value);
  }

  public onStateChange(event: any) {
    const { value, viewValue } = event.source;
    if (event.isUserInput) {
      console.log('USERcHANGE');
      this.townDataSource = [];   
      this.zipCodeDataSource = [];
      this.neighborhoodDataSource = [];   

      this.form.get('address')['controls']['neighborhoodId'].patchValue('');
      this.form.get('address')['controls']['zipCodeId'].patchValue('');
      this.form.get('address')['controls']['townId'].patchValue('');
    }
    this.getTowns(value);
  }

  public onTownChange(event: any) {
    const { value, viewValue } = event.source;
    this.getZipCodes(value);
  }

  public onZipCodeChange(event: any) {
    const { value, viewValue } = event.source;
    this.getNeighborhoods(value);
  }

  public onUploadUserAvatar(event) {
    if (event.target.files && event.target.files.length > 0) {
      const file: File = event.target.files[0];
      // Don't allow file sizes over 1MB
      if (file.size > this.MAX_SIZE) {
        //this.messages.push("File: " + file.name + " is too large to upload.");
        return;
      }

      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', this.isProfile ? this.profileId : this.user?.id);
      console.log('PRE ', formData);
      this.fileUploadDownloadService
        .uploadUserAvatar(formData)
        .then((result) => {
          console.log('AVATAR');
          this.userAvatarUrl = '';
          this.woodDialogService.handleResult(result).then(() => {
            this.setUserAvatarUrl(result?.result || undefined);
          });
        })
        .catch((error) => console.log(error));
    }
  }

  public setLinkPicture(url: string) {
    this.userAvatarUrl = url;
    this.timeStamp = new Date().getTime();
    this.localStorageService.getUserData();
  }

  public getLinkPicture() {
    if (this.timeStamp) {
      return this.userAvatarUrl + '?' + this.timeStamp;
    }
    return this.userAvatarUrl;
  }

  public factoryNew() {
    const options = { width: '300px' };
    this.woodDialogService
      .openComponent(FactoriesComponent, options)
      .then((result) => {
        if (result) {
          this.getFactories();
        }
      });
  }

  public departmentNew() {
    const options = {
      width: '300px',
      data: { factoryId: this.factorySelected },
    };
    this.woodDialogService
      .openComponent(DepartmentsComponent, options)
      .then((result) => {
        if (result) {
          this.getDepartments(this.factorySelected);
        }
      });
  }

  public validateTouched() {
    (<any>Object).values(this.form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }

  public getFactoryNameFromId(id: string) {
    const factory = this.factoryDataSource.find((factory) => factory.id == id);
    if (this.departmentDataSource.length == 0) {
      this.getDepartments(id);
    }

    this.mobileFactory = factory.name;
  }

  public getDepartmentNameById(id: string) {
    const department = this.departmentDataSource.find(
      (department) => department.id == id
    );

    this.mobileDepartment = department.name;
  }
  //#endregion

  //#region PRIVATE METHODS
  private formInit() {
    this.form = this.fb.group({
      id: '00000000-0000-0000-0000-000000000000',
      //datos generales
      name: '',
      firstName: new FormControl('', [Validators.required]),
      fLastName: new FormControl('', [Validators.required]),
      mLastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(RegExps.email),
      ]),
      phoneNumber: new FormControl('', [
        Validators.pattern(RegExps.phoneNumber),
      ]),
      isActive: new FormControl(true),
      avatarUrl: '',
      //Datos empresariales
      factoryId: new FormControl('', [Validators.required]),
      factoryName: '',
      departmentId: new FormControl('', [Validators.required]),
      departmentName: '',
      userTypeId: new FormControl('', [Validators.required]),
      userType: '',
      roleName: new FormControl('', [Validators.required]),

      //Domicilio
      address: new FormGroup({
        streetName: new FormControl(''),
        indoorNumber: new FormControl(''),
        outdoorNumber: new FormControl(''),
        countryId: new FormControl(null),
        stateId: new FormControl(null),
        townId: new FormControl(null),
        zipCodeId: new FormControl(''),
        neighborhoodId: new FormControl(null),
      }),
    });

    if (this.user) {
      // console.log(this.user)
      this.user.address = this.user.address || {
        streetName: '',
        indoorNumber: '',
        outdoorNumber: '',
        countryId: '',
        stateId: '',
        townId: '',
        zipCodeId: '',
        neighborhoodId: '',
      };
      this.user.factoryId =
        this.user.factoryId === '00000000-0000-0000-0000-000000000000'
          ? ''
          : this.user.factoryId;
      this.user.departmentId =
        this.user.departmentId === '00000000-0000-0000-0000-000000000000'
          ? ''
          : this.user.departmentId;
      this.form.setValue(this.user);
      const url = this.user?.avatarUrl || '';
      this.setUserAvatarUrl(url);
    } else {
      const url = `assets/images/avatars/${this.user?.id}`;
      this.setUserAvatarUrl(url);
    }
  }

  private formInitNoPermission() {
    this.form = this.fb.group({
      id: '00000000-0000-0000-0000-000000000000',
      //Domicilio
      name: '',
      firstName: new FormControl(''),
      fLastName: new FormControl(''),
      mLastName: new FormControl(''),
      email: new FormControl(''),
      phoneNumber: new FormControl(''),
      isActive: new FormControl(true),
      avatarUrl: '',
      //Datos empresariales
      factoryId: new FormControl(''),
      factoryName: '',
      departmentId: new FormControl(''),
      departmentName: '',
      userTypeId: new FormControl(''),
      userType: '',
      roleName: new FormControl(''),
      address: new FormGroup({
        streetName: new FormControl(''),
        indoorNumber: new FormControl(''),
        outdoorNumber: new FormControl(''),
        countryId: new FormControl(null),
        stateId: new FormControl(null),
        townId: new FormControl(null),
        zipCodeId: new FormControl(''),
        neighborhoodId: new FormControl(null),
      }),
    });

    if (this.user) {
      // console.log(this.user)
      this.user.address = this.user.address || {
        streetName: '',
        indoorNumber: '',
        outdoorNumber: '',
        countryId: '',
        stateId: '',
        townId: '',
        zipCodeId: '',
        neighborhoodId: '',
      };
      this.user.factoryId =
        this.user.factoryId === '00000000-0000-0000-0000-000000000000'
          ? ''
          : this.user.factoryId;
      this.user.departmentId =
        this.user.departmentId === '00000000-0000-0000-0000-000000000000'
          ? ''
          : this.user.departmentId;
      this.form.setValue(this.user);
      const url = this.user?.avatarUrl || '';
      this.setUserAvatarUrl(url);
    } else {
      const url = `assets/images/avatars/${this.user?.id}`;
      this.setUserAvatarUrl(url);
    }
  }

  //Datos Empresariales
  private getFactories() {
    this.factoryService
      .getList()
      .toPromise()
      .then((result) => {
        this.factoryDataSource = result || [];
        if (!this.hasPermission) {
          this.getFactoryNameFromId(this.user.factoryId);
        }
      })
      .catch();
  }
  private getDepartments(factoryId) {
    console.log('departmentDataSource', this.departmentDataSource);
    this.departmentService
      .getListByFactoryId(factoryId)
      .toPromise()
      .then((result) => {
        console.log(result);
        this.departmentDataSource = result || [];
        console.log('departmentDataSource', this.departmentDataSource);
        if (!this.hasPermission) {
          this.getDepartmentNameById(this.user.departmentId);
        }
      })
      .catch();
  }
  private getUserType() {
    this.userTypeDataSource = [
      { id: 1, name: 'Empleado' },
      { id: 2, name: 'Cliente' },
      { id: 3, name: 'Proveedor' },
    ];
  }
  private getRoles() {
    this.roleService
      .getAllList()
      .toPromise()
      .then((result) => {
        this.roleDataSource = result || [];
      })
      .catch();
  }
  // Domicilio
  private getCountries() {
    this.sepomexService
      .getCountries()
      .toPromise()
      .then((result) => {
        this.countryDataSource = result || [];
        //this.form.controls.address.get("countryId").setValue(this.defaultCountryId);
      })
      .catch((error) => console.log(error));
  }
  private getStates(countryId: number) {
    this.sepomexService
      .getStates(countryId)
      .toPromise()
      .then((result) => {
        console.log(result);
        this.stateDataSource = result || [];
      })
      .catch((error) => console.log(error));
  }
  private getTowns(stateId: number) {
    this.sepomexService
      .getTowns(stateId)
      .toPromise()
      .then((result) => {
                  
        this.townDataSource = result || [];                        
      })
      .catch((error) => console.log(error));
  }
  private getZipCodes(townId: number) {
    this.sepomexService
      .getZipCode(townId)
      .toPromise()
      .then((result) => {
        this.zipCodeDataSource = result || [];
      })
      .catch((error) => console.log(error));
  }
  private getNeighborhoods(zipCodeId: string) {
    this.sepomexService
      .getNeighborhood(zipCodeId)
      .toPromise()
      .then((result) => {
        this.neighborhoodDataSource = result || [];
      })
      .catch((error) => console.log(error));
  }
  private isEditOrProfile() {
    this.isProfile = this.router.url.includes('/users/profile');
    const isEdit = this.router.url.includes('/users/edit');
    this.isEdit = isEdit || this.isProfile;
    this.title = this.isEdit ? 'Editar Usuario' : 'Registrar Usuario';
    if (this.isProfile) {
      this.title = 'Mi Perfil';
    }
  }
  private setUserAvatarUrl(url: string = undefined) {
    this.setLinkPicture(
      `${environment.apis.default.url}/${url}?last=${Math.random()}`
    );
  }
  //#endregion
}
