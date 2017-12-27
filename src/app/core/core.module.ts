import { NgModule } from '@angular/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

// import { SharedModule } from "../../app/shared/shared.module";
import { CoreRoutingModule } from './core-routing.module';
// import { AppRoutingModule } from '../../app/app-routing.module';

import { ShellComponent } from './shell/shell.component';
import { ToolbarComponent } from './shell/toolbar/toolbar.component';
import { MainContentComponent } from './shell/main-content/main-content.component';
import { SidenavComponent } from './shell/sidenav/sidenav.component';
import { FooterComponent } from './shell/footer/footer.component';
// import { BreadcrumbComponent } from './shell/breadcrumb/breadcrumb.component';

import { Ng5BreadcrumbModule } from 'ng5-breadcrumb';
// import { NotFoundPageComponent } from './components/not-found-page.component';
import { AngularModule } from '../shared/angular/angular.module';
import { MaterialModule } from '../shared/material/material.module';
import { CovalentModule } from '../shared/covalent/covalent.module';

const SHELL_COMPONENTS: any[] = [
  ShellComponent, 
  ToolbarComponent, MainContentComponent,
  SidenavComponent, SidenavComponent, FooterComponent
  // ,
  // NotFoundPageComponent
  // BreadcrumbComponent
]

@NgModule({
  imports: [
    //routing App module
    CoreRoutingModule,

    AngularModule,
    MaterialModule,
    CovalentModule,

    Ng5BreadcrumbModule.forRoot()
  ],
  declarations: [
    SHELL_COMPONENTS,
    ],
  exports: [
    // ShellComponent,
    // NotFoundPageComponent,
    ],
  // providers: [
    // BreadcrumbService
  // ]
})
export class CoreModule { }
