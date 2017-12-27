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
import { LoginPageComponent } from './containers/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { AngularModule } from '../shared/angular/angular.module';


export const COMPONENTS = [ 
  UserComponent, 
  GroupComponent,
  LoginPageComponent,
  LoginFormComponent
];

@NgModule({
  imports: [
    // CommonModule,
    // ReactiveFormsModule, 
    AuthRoutingModule,
    AngularModule,
    MaterialModule,
    // RouterModule.forChild(routes),
    // AuthRoutingModule,
  ],
  declarations: COMPONENTS,
  // exports: COMPONENTS
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