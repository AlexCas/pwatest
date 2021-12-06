import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { WoodDialogService } from '@core/wood-dialog/wood-dialog.service';
import { ResultCode } from 'app/proxy/enums';
import { ResetPwdDto } from 'app/proxy/users';
import { AppMessages } from '@core/utils/app-messages';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.scss'],
})
export class ResetPwdComponent implements OnInit {
  //#region ATTRIBUTES
  form: FormGroup;
  inputTypePassword = 'password';
  inputTypeConfirmPassword = 'password';
  visible = false;
  confirmVisible = false;

  email: string = '';
  token: string = '';
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private authService: AuthService,
    private woodDialogService: WoodDialogService
  ) {}

  ngOnInit(): void {
    this.getParamsFromUrl();
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: [''],
    });
  }

  public onSubmit() {
    const validate = this.checkPasswords(this.form);
    if (!validate) {
      this.woodDialogService.handleResult({
        resultCode: ResultCode.Warning,
        message: AppMessages.invalidGrantConfirmPassword,
      });
    } else if (this.form.valid) {
      const data: ResetPwdDto = {
        email: this.email,
        token: this.token,
        password: this.form.controls.password.value,        
      };
      this.authService.resetPasswordComplete(data);
    }
  }

  private getParamsFromUrl() {
    const routeQuery = this.route.snapshot.queryParams;
    const routeParams = this.route.snapshot.paramMap;

    this.token = routeQuery.token.replaceAll(' ', '+');
    this.email = routeParams.get('email');
  }

  public toggleVisibility(type: string = 'password') {
    if (this.visible || this.confirmVisible) {
      type === 'password'
        ? (this.inputTypePassword = 'password')
        : (this.inputTypeConfirmPassword = 'password');
      type === 'password'
        ? (this.visible = false)
        : (this.confirmVisible = false);
      this.cd.markForCheck();
    } else {
      type === 'password'
        ? (this.inputTypePassword = 'text')
        : (this.inputTypeConfirmPassword = 'text');
      type === 'password'
        ? (this.visible = true)
        : (this.confirmVisible = true);
      this.cd.markForCheck();
    }
  }

  checkPasswords(group: FormGroup) {
    // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? true : false;
  }
  //#endregion
}
