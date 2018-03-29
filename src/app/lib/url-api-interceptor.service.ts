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
export class UrlApiInterceptorService implements HttpInterceptor {
  private apiUrl = environment.apiUrl;
  private authUrl = environment.authUrl;

  constructor() { }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const urlReq = this.setUrlHeader(req);
    const handledRequest = next.handle(urlReq);
    return handledRequest;
  }

  private setUrlHeader(req: HttpRequest<any>): HttpRequest<any> {
    let url: string;
    if (typeof req === 'string') {
      url = this.excludeAssets(req);
    } else {
      url = this.excludeAssets(req.url);
    }
    const reqUrl = req.clone({ url: url });
    return reqUrl;
  }

  private excludeAssets(currentUrl) {
    if (currentUrl.includes('/assets/')) {
      return currentUrl;
    } else if (currentUrl.includes('logout/')) {
      // Esta opcion es solo para el caso del logout. :D
      return this.authUrl + currentUrl;
    } else {
      return this.apiUrl + currentUrl;
    }
  }
}
