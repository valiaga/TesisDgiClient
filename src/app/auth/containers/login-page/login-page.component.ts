import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';
import { UserStoreService } from '../../../lib/user-store.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dgi-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public errorMessage: string | null;
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userStoreService: UserStoreService,
  ) { }

  ngOnInit() {
    this.errorMessage = null;
    this.buildForm();
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.loginForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      username: [[], Validators.required],
      password: [[], Validators.required],
    };
    return controls;
  }

  public submit() {
    const valid = this.loginForm.valid;
    const value = this.loginForm.value;
    if (valid) {
      this.authService.login(value)
        .subscribe(this.postLogin.bind(this), this.showMessageError.bind(this));
    }
  }

  private showMessageError(err: HttpErrorResponse) {
    if (err.ok === false && err.status === 400) {
      this.errorMessage = 'Credenciales Incorrectas.';
    }
  }

  public postLogin(res) {
    if (res && res.token) {
      this.saveToken(res.token);
      this.saveUser(res.user);
      this.navigateHome();
    }
  }

  private navigateHome() {
    this.router.navigateByUrl('');
  }

  private saveToken(token: string) {
    this.userStoreService.token = token;
  }

  private saveUser(user: any) {
    this.userStoreService.profile = user;
  }
}
