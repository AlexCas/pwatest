import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { CreateUpdateDepartmentDto, DepartmentService } from 'app/proxy/departments';
import { ResultCode } from 'app/proxy/enums';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {
  //#region ATTRIBUTES
  title = "Registrar Departamento"
  form: FormGroup
  appMessage = new AppMessages()
  factoryId: string
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    public dialogRef: MatDialogRef<DepartmentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private woodDialogService: WoodDialogService
  ) {
    this.factoryId = data?.factoryId
  }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.formInit()
  }

  public onSubmit() {
    const body: CreateUpdateDepartmentDto = this.form.value;
    this.departmentService.insert(body).toPromise()
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
      factoryId: this.factoryId
    });
  }
  //#endregion
}
