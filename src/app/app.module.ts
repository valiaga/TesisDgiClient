// import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';
// import { ShellComponent } from "./core/shell/shell.component";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NotFoundPageComponent } from './core/components/not-found-page.component';
import { MaterialModule } from './shared/material/material.module';
// import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
// import { TokenInterceptorService } from './lib/token-interceptor.service';
import { AuthGuardService } from './auth/shared/auth-guard.service';
import { LibModule } from './lib/lib.module';
// import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,

    // HttpClientModule,
    LibModule,
    // AuthModule.forRoot(),
  ],
  providers: [
    AuthGuardService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
