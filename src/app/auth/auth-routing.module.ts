import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';
import { LoginPageComponent } from './containers/login-page.component';

const routes: Routes = [
    // { path: '', redirectTo: 'login' },
    { path: '', component: LoginPageComponent },
    { path: 'groups', component: GroupComponent },
    { path: 'users', component: UserComponent }
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