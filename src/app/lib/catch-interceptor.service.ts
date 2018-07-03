import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpErrorResponse,
  HttpResponse, HttpHandler, HttpEvent, HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { snackBarDuration } from 'config/general';

@Injectable()
export class CatchInterceptorService implements HttpInterceptor {
  private started;

  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.started = Date.now();
    const handledRequest = next.handle(req);
    const successCallback = this.interceptResponse.bind(this);
    const errorCallback = this.catchError.bind(this);
    const interceptionOperator = tap<HttpEvent<any>>(
      successCallback,
      errorCallback
    );
    return handledRequest.pipe(interceptionOperator);
  }

  private interceptResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      const elapsed_ms = Date.now() - this.started;
      if (elapsed_ms >= 10 * 1000) {
        console.warn(`La solicitud ${event.url} de tomó ${elapsed_ms} ms.`);
      }
    }
  }

  private catchError(err) {
    if (err instanceof HttpErrorResponse) {
      this.catchHttpError(err);
    } else {
      console.error(err.message);
    }
  }

  private catchHttpError(err: HttpErrorResponse) {
    if (err.status === 401) {
      this.catchUnauthorized();
    } else {
      console.warn(err.statusText);
      this.snackBar.open(err.status.toString(), err.statusText, snackBarDuration);
    }
  }


  private catchUnauthorized() {
    console.log('Not authorized');
    this.navigateToLogin();
  }
  private navigateToLogin() {
    // this.router.navigateByUrl('/credentials/login');
    this.router.navigateByUrl('auth/login');
  }
}
