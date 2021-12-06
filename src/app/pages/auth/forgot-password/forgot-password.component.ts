import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  //#region ATTRIBUTES
  form: FormGroup;
  //#endregion

  //#region CONSTRUCTOR
  constructor(private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {
  }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  public onSubmit() {
    //this.authService.login(this.form.value)
    this.authService.resetPasswordRequest(this.form.controls["email"].value);
  }
  //#endregion

  //#region PRIVATE METHODS
}
