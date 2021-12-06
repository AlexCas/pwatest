import { Component, OnInit } from '@angular/core';
import { ProfilingService } from 'app/proxy/profilings/profiling.service';
import * as moment from 'moment';
import { NO_RESULT_TEXT } from '@core/utils/app-messages';
import { pageSizeOptions } from '@core/utils';
import { LocalStorageService } from 'app/pages/auth/services/local-storage.service';
import { AppMessages } from '@core/utils/app-messages';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { QualityAlertService } from 'app/proxy/reports/quality-alert.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { AuthService } from 'app/pages/auth/services/auth.service';
import { Router } from '@angular/router';
import { IndicatorService } from 'app/proxy/indicators/indicator.service';

@Component({
  selector: 'app-alerts-mobile',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsMobileComponent implements OnInit {
  alertsData: any;
  alertTypes: any;

  alertTypesSelected: any = [];
  appMessage = new AppMessages();

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

  filterOpen = false;

  selectedAllAlerts: boolean = false;

  alertsSwitch: boolean = false;

  appUrl: string = '';

  reportName: string = 'Alertas de Calidad';

  carouselConfig: boolean = false;

  showCarrousel: boolean = false;

  constructor(
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private profilingService: ProfilingService,
    private qualityAlertService: QualityAlertService,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router,
    private indicatorService: IndicatorService
  ) {}
  ngOnInit(): void {
    /*if (!this.authService.getIndicatorsByUser(this.reportName)){
      this.router.navigateByUrl('/dashboard');
    }*/
    this.getPermissions();
    this.appUrl =
      window.location.hostname == 'localhost'
        ? 'http://windevvm.westus2.cloudapp.azure.com:83'
        : 'http://windevvm.westus2.cloudapp.azure.com:89';
  }

  sanitizeUrl(url) {
    const _url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    return _url;
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

  getPermissions() {
    const role = this.localStorageService.getUserData().role;
    if(role == "Administrador"){
      this.showCarrousel = true;
    }
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
        this.form.controls['warehouseId'].patchValue(
          this.rolePermissionsData.factories[0].warehouses[0].warehouseId
        );
        this.getAlertsData();
        this.getAlertTypes();
      });
  }

  getAlertsData() {
    const form = this.form.value;
    this.qualityAlertService
      .getList({
        alertTypes: this.alertTypesSelected.map((a) => a.id),
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
        this.alertsData = result;
      });
  }

  getAlertTypes() {
    this.qualityAlertService
      .getListAlertTypes()
      .toPromise()
      .then((result) => {
        this.alertTypes = result;
      });
  }

  checkAlert(alert) {
    return this.alertTypesSelected.find((m) => alert == m);
  }

  selectAlerts(alert, event) {
    let _machineList = [];

    if (event) {
      _machineList = this.alertTypesSelected;
      _machineList.push(alert);
    } else {
      for (let i = 0; this.alertTypesSelected.length >= i; i++) {
        if (this.alertTypesSelected[i] != alert) {
          if (this.alertTypesSelected[i]) {
            _machineList.push(this.alertTypesSelected[i]);
          }
        }
      }
    }

    console.log(_machineList);

    this.alertTypesSelected = _machineList;
  }

  cleanAlerts(event) {
    event.preventDefault();
    this.alertTypesSelected = [];
  }

  backToForm(event) {
    event.preventDefault();
    this.alertsSwitch = false;
  }

  selectAllAlerts() {
    this.selectedAllAlerts = !this.selectedAllAlerts;

    if (this.selectedAllAlerts) {
      this.alertTypesSelected = this.alertTypes;
    } else {
      this.alertTypesSelected = [];
    }
  }

  onFactoryChange(event) {
    const { value, selected } = event.source;
    console.log(value);
    this.factorySelected = value;
  }

  onSubmit() {
    this.filterOpen = false;
    this.getAlertsData();
  }

  cleanValues(event) {
    event.preventDefault();
    this.filterOpen = false;
    this.alertTypesSelected = [];
    this.getPermissions();
  }

  resizeIframe(frame) {
    console.log(frame);
  }

  switchAlerts() {
    this.alertsSwitch = true;
  }

  formInit() {
    this.form = this.fb.group({
      alertTypes: new FormControl(''),
      factoryId: new FormControl(''),
      warehouseId: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
    });
  }
}
