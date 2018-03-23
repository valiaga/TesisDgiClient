import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'dgi-login-page',
  templateUrl: 'login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public errorMessage: string;
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
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
      console.log(value);
      this.authService.login(value)
        .subscribe(this.postLogin.bind(this));
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
    localStorage.setItem('token', token);
  }

  private saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
