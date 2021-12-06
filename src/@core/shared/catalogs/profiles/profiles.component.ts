import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppMessages } from '@core/utils/app-messages';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ResultCode } from 'app/proxy/enums';
import { CreateUpdateProfileDto, ProfileService } from 'app/proxy/roles';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  title = 'Registrar Tipo de Usuario';
  form: FormGroup;
  appMessage = new AppMessages();

  constructor(
    public dialogRef: MatDialogRef<ProfilesComponent>,
    private fb: FormBuilder,
    private woodDialogService: WoodDialogService,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.formInit();
  }

  public onSubmit() {
    const body: CreateUpdateProfileDto = this.form.value;
    this.profileService
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
  //#endregion

  private formInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }
}
