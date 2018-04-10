import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ModuleWithProviders } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { AuthGuardService } from './shared/auth-guard.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { LoginFormComponent } from './components/login-form.component';
import { AngularModule } from '../shared/angular/angular.module';
import { AuthComponent } from './auth.component';
import {
  RegisterPageComponent,
  LoginPageComponent,
} from './containers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule, MatInputModule, MatButtonModule } from '@angular/material';
import { UrlAuthInterceptorService } from '../lib/url-auth-interceptor.service';
import { UserStoreService } from '../lib/user-store.service';

export const COMPONENTS = [
  UserComponent,
  GroupComponent,
  LoginPageComponent,
  LoginFormComponent,
  AuthComponent,
  RegisterPageComponent,
];

export const MATERIAL_MODULES: any = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
];

export const ANGULAR_MODULES: any = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
];

@NgModule({
  imports: [
    AuthRoutingModule,
    ...MATERIAL_MODULES,
    ...ANGULAR_MODULES,
  ],
  declarations: COMPONENTS,
  providers: [
    AuthService,
    UserStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlAuthInterceptorService,
      multi: true,
    },
  ],
})
export class AuthModule {
  // static forRoot(): ModuleWithProviders {
  // return {
  // ngModule: RootAuthModule,
  // providers: [ AuthService, AuthGuardService  ]
  // }
  // }
}


// @NgModule({
  // imports: [
    // AuthModule,
    // RouterModule.forChild([{ path: 'login', component: LoginPageComponent }]),
  // ]
// })
// export class RootAuthModule { }
