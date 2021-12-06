import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ResultCode } from 'app/proxy/enums';
import { CreateUpdateUserTypeDto, UserTypeService } from 'app/proxy/user-types';

@Component({
  selector: 'app-userType',
  templateUrl: './userType.component.html',
  styleUrls: ['./userType.component.scss']
})
export class UserTypeComponent implements OnInit {
  //#region ATTRIBUTES
  title = "Registrar Tipo de Usuario"
  form: FormGroup
  appMessage = new AppMessages()
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public dialogRef: MatDialogRef<UserTypeComponent>,
    private fb: FormBuilder,
    private userType: UserTypeService,
    private woodDialogService: WoodDialogService
  ) { }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.formInit()
  }

  public onSubmit() {
    const body: CreateUpdateUserTypeDto = this.form.value;
    this.userType.insert(body).toPromise()
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
    });
  }
  //#endregion
}
