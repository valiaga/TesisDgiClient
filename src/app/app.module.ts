// import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
// import { ShellComponent } from "./core/shell/shell.component";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './core/components/not-found-page.component';
import { MaterialModule } from './shared/material/material.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent
  ],
  imports: [
    // BrowserModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule
    // BrowserModule,
    // CoreModule,
    // AuthModule.forRoot(),
  ],
  providers: [],
  bootstrap: [
    AppComponent,
    // ShellComponent
  ]
})
export class AppModule { }
