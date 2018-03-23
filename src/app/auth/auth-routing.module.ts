import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import {
  RegisterPageComponent,
  LoginPageComponent,
} from './containers';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
    ]
    // component: LoginPageComponent
  },
  // { path: 'groups', component: GroupComponent },
  // { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }

// export const routedComponents = [
//     UserComponent,
//     GroupComponent,
// ];
