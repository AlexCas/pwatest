import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WarehouseService } from 'app/proxy/warehouses';
import { FactoryService } from 'app/proxy/factories';
import { HttpClient } from '@angular/common/http';
import { TransactionResult } from 'app/proxy/models';
import * as moment from 'moment';

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AppMessages } from '@core/utils/app-messages';
import { ResultCode } from 'app/proxy/enums';
import { QualityAlertService } from 'app/proxy/reports/quality-alert.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  @ViewChild('titleFile') titleFile: ElementRef;
  title: string = 'Registrar Dispositivo';
  factoryDataSource: any[] = [];
  factorySelected: string;
  warehouseDataSource: any[] = [];
  alertsDataSorce: any[] = [];
  warehouseSelected: string;
  startTime: string;
  endTime: string;
  dataText: string = 'Selecciona el archivo';
  appMessage = new AppMessages();

  form: FormGroup;
  formState: FormGroup;
  isFormChange: boolean = true;

  constructor(
    private fb: FormBuilder,
    private factoryService: FactoryService,
    private http: HttpClient,
    private router: Router,
    private warehouseService: WarehouseService,
    private qualityAlertsService: QualityAlertService,
    private woodDialogService: WoodDialogService
  ) {}

  ngOnInit(): void {
    this.formInit();
    this.getFactories();
    this.alertsDataSorce = [
      {
        name: 'Queja de Cliente Oficial',
        id: 1,
      },
      {
        name: 'No conformidad auditoría externa',
        id: 2
      },
      {
        name: 'Reclamo interno',
        id: 3
      },
      {
        name: 'No conformidad auditoría interna',
        id: 4
      }
    ];
  }

  public onFactoryChange(event) {
    //this.isEqual();
    console.log('Factorychange?');
    const { value, selected } = event.source;
    if (event.isUserInput || selected) {
      this.factorySelected = value;
      this.getWarehousesByFactoryId();
    }
  }

  public setStartTime(event: any) {
    const startDate = moment(this.form.controls['startDate'].value).format(
      'L'
    );
    const _date = moment(`${startDate} ${event.target.value}`).format(
      'YYYY-MM-DD H:mm:ss'
    );

    this.form.controls['startDate'].patchValue(_date);
  }

  public setEndTime(event: any) {
    const endDate = moment(this.form.controls['endDate'].value).format(
      'L'
    );
    const _date = moment(`${endDate} ${event.target.value}`).format(
      'YYYY-MM-DD H:mm:ss'
    );

    this.form.controls['endDate'].patchValue(_date);
  }

  startDateChange(event) {

    console.log(event.target.value)
    const _date = moment(event.target.value).format(
      'YYYY-MM-DD H:mm:ss'
    );

    this.form.controls['startDate'].patchValue(_date);
  }

  endDateChange(event) {

    console.log(event.target.value)
    const _date = moment(event.target.value).format(
      'YYYY-MM-DD H:mm:ss'
    );

    this.form.controls['endDate'].patchValue(_date);
  }

  public printData() {
    console.log(this.form.value);
  }

  public onSumbit() {
    if (this.form.valid) {
      const _form = this.form;
      _form.removeControl('dummyStartTime');
      _form.removeControl('dummyEndTime');

      const _sdate = moment(this.form.controls['dummyStartDate'].value).format(
        'YYYY-MM-DD H:mm:ss'
      );
  
      this.form.controls['startDate'].patchValue(_sdate);

      const _ddate = moment(this.form.controls['dummyEndDate'].value).format(
        'YYYY-MM-DD H:mm:ss'
      );
  
      this.form.controls['endDate'].patchValue(_ddate);


      _form.removeControl('dummyStartDate');
      _form.removeControl('dummyEndDate');
      const value = _form.value;

      const formData = new FormData();
      Object.entries(this.form.value).forEach(([key, value]: any[]) => {
        formData.set(key, value);
      });
      console.log(formData);

      this.http
        .post<TransactionResult<string>>(
          '/api/app/quality-alert',
          formData
        )
        .subscribe(
          (result) => {
            this.woodDialogService.handleResult(result).then(() => {
              if (result?.resultCode === ResultCode.Success) {
                this.router.navigate(['/']);
              }
            });
          },
          (error) => {
            console.log(error);
            this.woodDialogService.handleError(error);
          }
        );
      /*this.qualityAlertsService
        .insert(value)
        .toPromise()
        .then((result) => {
          this.woodDialogService.handleResult(result).then(() => {
            if (result.resultCode === ResultCode.Success) {
              this.router.navigate(['/']);
            }
          });
        })
        .catch((error) => {
          console.log(error);
          this.woodDialogService.handleError(error);
        }); */
    }
  }

  public selectFile(event: any) {
    this.form.controls['file'].patchValue(event.target.files[0]);

    console.log(event.target.files[0]);

    this.titleFile.nativeElement.setAttribute(
      'placeholder',
      event.target.files[0].name
    );
  }

  private formInit() {
    this.form = this.fb.group({
      file: new FormControl('', [Validators.required]),
      factoryId: new FormControl('', [Validators.required]),
      warehouseId: new FormControl('', [Validators.required]),
      startDate: new FormControl(''),
      dummyStartDate: new FormControl('', [Validators.required]),
      dummyEndDate: new FormControl('', [Validators.required]),
      dummyStartTime: new FormControl(''),
      dummyEndTime: new FormControl(''),
      endDate: new FormControl(''),
      alertTypeId: new FormControl('', [Validators.required]),
    });
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

  private getWarehousesByFactoryId() {
    this.warehouseService
      .getListByFactoryId(this.factorySelected)
      .toPromise()
      .then((result) => {
        this.warehouseDataSource = result || [];
      })
      .catch();
  }
}
