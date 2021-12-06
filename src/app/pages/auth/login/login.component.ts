import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //#region ATTRIBUTES
  form: FormGroup;
  inputType = 'password';
  visible = false;
  email = "administrador.andon@protonmail.com"
  password = ''
  //#endregion

  //#region CONSTRUCTOR
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private authService: AuthService
  ) {
  }
  //#endregion

  //#region PUBLIC METHODS
  public ngOnInit() {
    this.form = this.fb.group({
      email: [this.email, [Validators.required, Validators.email]],
      password: [this.password, Validators.required]
    });
  }

  public onSubmit() {
    this.authService.login(this.form.value)
  }

  public toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
  //#endregion

  //#region PRIVATE METHODS
  //#endregion
}
