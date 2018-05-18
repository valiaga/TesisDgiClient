import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

class Options {
    delete: string;
    post: string;
    get: string;
    put: string;
}

interface IMessage {
    modulo: string;
    options: Options;
}

@Injectable()
export class MessagesService {

    constructor(private http: HttpClient) { }

    public getMessages(): Observable<IMessage[]> {
        return this.http.get<IMessage[]>(`config/messages.json`);
    }

    public getMessages1() {
        return this.http.get(`config/messages.1.json`)
            .subscribe(res => {
                console.log('RES: ', res['tesisProceso']['delete']);
            });
    }
}
