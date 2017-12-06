import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from "../../app/shared/shared.module";
import { AppRoutingModule } from '../../app/app-routing.module';

import { ShellComponent } from './shell/shell.component';
import { ToolbarComponent } from './shell/toolbar/toolbar.component';
import { MainContentComponent } from './shell/main-content/main-content.component';
import { SidenavComponent } from './shell/sidenav/sidenav.component';
import { FooterComponent } from './shell/footer/footer.component';
// import { BreadcrumbComponent } from './shell/breadcrumb/breadcrumb.component';

import { Ng2BreadcrumbModule } from 'ng2-breadcrumb/ng2-breadcrumb';

const SHELL_COMPONENTS: any[] = [
  ShellComponent, ToolbarComponent, MainContentComponent,
  SidenavComponent, SidenavComponent, FooterComponent
  // BreadcrumbComponent
]

@NgModule({
  imports: [
    //routing App module
    AppRoutingModule,

    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,

    Ng2BreadcrumbModule.forRoot()
  ],
  declarations: [
    SHELL_COMPONENTS
    ],
  exports: [
    ShellComponent
    ]
})
export class CoreModule { }
