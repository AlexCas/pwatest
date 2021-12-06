import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import {
  CreateUpdateWarehouseDto,
  WarehouseService,
} from 'app/proxy/warehouses';
import { ResultCode } from 'app/proxy/enums';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.scss'],
})
export class WarehousesComponent implements OnInit {
  title = 'Registrar Nave';
  form: FormGroup;
  appMessage = new AppMessages();
  factoryId: string;

  constructor(
    public dialogRef: MatDialogRef<WarehousesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private woodDialogService: WoodDialogService
  ) {
    this.factoryId = data?.factoryId
  }

  ngOnInit() {
    this.formInit();
  }

  public onSubmit() {
    const body: CreateUpdateWarehouseDto = this.form.value;
    this.warehouseService
      .insert(body)
      .toPromise()
      .then((result) => {
        this.woodDialogService.handleResult(result).then(() => {
          if (result.resultCode === ResultCode.Success) {
            this.dialogRef.close(true);
          }
        });
      })
      .catch((error) => {
        this.woodDialogService.handleError(error);
      });
  }

  private formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nomenclature: ['', Validators.required],
      factoryId: this.factoryId,
    });
  }
}
