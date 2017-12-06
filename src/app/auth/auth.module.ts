import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { GroupComponent } from './group/group.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent
  },
   {
     path: 'group',
     component: GroupComponent
   }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


  ],
  declarations: [
    UserComponent, 
    GroupComponent
    ]
})
export class AuthModule { }
