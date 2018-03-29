import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { UrlApiInterceptorService } from './url-api-interceptor.service';
import { CatchInterceptorService } from './catch-interceptor.service';
import { UserStoreService } from './user-store.service';

@NgModule({
    imports: [
        HttpClientModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: UrlApiInterceptorService,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CatchInterceptorService,
            multi: true,
        },
        UserStoreService,
    ],
})
export class LibModule { }
