import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsesor, IResponse, Asesor } from './asesor';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class AsesoresService {
  private readonly url: string = 'proyecto/asesores/';

  constructor(private httpClient: HttpClient) { }

  public getList$(params?: any): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.url, { params: params });
  }

  public getById$(id: string): Observable<IAsesor[]> {
    return this.httpClient.get<IAsesor[]>(`${this.url}${id}/`);
  }

  public save$(data: any): Observable<IAsesor[]> {
    return this.httpClient.post<IAsesor[]>(this.url, data);
  }

  public update$(id: string, data: any): Observable<IAsesor[]> {
    return this.httpClient.put<IAsesor[]>(`${this.url}${id}/`, data);
  }

  public delete$(id: string): Observable<IAsesor[]> {
    return this.httpClient.delete<IAsesor[]>(`${this.url}${id}/`);
  }
}

@Injectable()
export class AsesoresReactiveService {
  asesores: Observable<Asesor[]>;
  private _asesores: BehaviorSubject<Asesor[]>;
  private dataStore: {
    asesores: Asesor[],
  };
  constructor(private asesoresService: AsesoresService,
    private snackBar: MatSnackBar) {

    this.dataStore = { asesores: [] };
    this._asesores = <BehaviorSubject<Asesor[]>>new BehaviorSubject([]);
    this.asesores = this._asesores.asObservable();
  }

  public getList(params?: any) {
    return this.asesoresService
      .getList$(params)
      .pipe(map(res => res.results))
      .subscribe(data => {
        this.snackBar.open(MESSAGES.asesor.getMany, MESSAGES.actions.get, snackBarDuration);
        this.dataStore.asesores = data;
        this._asesores.next(Object.assign({}, this.dataStore).asesores);
      }, error => console.warn('Could not load asesores.'),
      );
  }

  public save(asesor: any) {
    this.asesoresService.save$(asesor)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.asesor.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.asesores.push(data);
        this._asesores.next(Object.assign({}, this.dataStore).asesores);
      }, error => console.warn('Could not create asesor.'));
  }


  public update(id: string, asesor: any) {
    this.asesoresService.update$(id, asesor)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.asesor.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.asesores.forEach((a, index) => {
          if (a.id === data.id) { this.dataStore.asesores[index] = data; }
        });

        this._asesores.next(Object.assign({}, this.dataStore).asesores);
      }, error => console.warn('Could not update asesor.'));
  }

  public delete(id: string) {
    this.asesoresService.delete$(id)
      .subscribe(response => {

        this.snackBar.open(MESSAGES.asesor.delete, MESSAGES.actions.delete, snackBarDuration);

        this.dataStore.asesores.forEach((a, index) => {
          if (a.id === id) { this.dataStore.asesores.splice(index, 1); }
        });
        this._asesores.next(Object.assign({}, this.dataStore).asesores);
      }, error => console.warn('Could not delete asesor.'));
  }

}
