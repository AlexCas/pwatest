import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ResultCode } from 'app/proxy/enums';
import { CreateUpdateFactoryDto, FactoryService } from 'app/proxy/factories';

@Component({
  selector: 'app-factories',
  templateUrl: './factories.component.html',
  styleUrls: ['./factories.component.scss']
})
export class FactoriesComponent implements OnInit {
  //#region ATTRIBUTES
  title = "Registrar Planta"
  form: FormGroup
  appMessage = new AppMessages()
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public dialogRef: MatDialogRef<FactoriesComponent>,
    private fb: FormBuilder,
    private factoryService: FactoryService,
    private woodDialogService: WoodDialogService
  ) { }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.formInit()
  }

  public onSubmit() {
    const body: CreateUpdateFactoryDto = this.form.value;
    this.factoryService.insert(body).toPromise()
      .then(result => {
        this.woodDialogService.handleResult(result)
          .then(() => {
            if (result.resultCode === ResultCode.Success) {
              this.dialogRef.close(true);
            }
          })
      })
      .catch(error => {
        this.woodDialogService.handleError(error)
      })
  }
  //#endregion

  //#region PRIVATE METHODS
  private formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      nomenclature: ['', Validators.required],
    });
  }
  //#endregion
}
