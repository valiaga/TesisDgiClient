import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  private apiUrl = environment.apiUrl;
  private token = 'InitialAuthorizationToken';

  constructor() {
    // constructor(private busService: BusService) {
    this.subscribeToTokenChanges();
  }

  private subscribeToTokenChanges() {
    // this.busService.getUserToken$().subscribe(this.setTokenIfAny.bind(this));
  }
  private setTokenIfAny(data) {
    if (data && data.token) {
      this.token = data.token;
    }
  }
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authorizationReq = this.setAuthHeader(req);
    const authorizationAndUrlReq = this.setUrlHeader(authorizationReq);
    const handledRequest = next.handle(authorizationAndUrlReq);
    return handledRequest;
  }
  private setAuthHeader(req: HttpRequest<any>): HttpRequest<any> {
    const authorization = `Bearer ${this.token}`;
    const headers = req.headers.set('Authorization', authorization);
    const authorizationReq = req.clone({ headers });
    return authorizationReq;
  }
  private setUrlHeader(req: HttpRequest<any>): HttpRequest<any> {
    // const headers = req.url === this.apiUrl;
    // const urlReq = req.clone({ headers });
    return req;
  }
  private excludeAssets(currentUrl) {
    if (currentUrl.includes('/assets/')) {
      return currentUrl;
    } else {
      return this.apiUrl + currentUrl;
    }
  }
}
