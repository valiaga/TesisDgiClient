import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPersona, Persona } from './persona';
import { MatSnackBar } from '@angular/material';
// import { map } from 'rxjs/operators';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';

@Injectable(
  // {
  //   providedIn: 'root'
  // }
)
export class PersonasService {
  private readonly url: string = 'config/personas/';

  constructor(private httpClient: HttpClient) { }

  public getList$(params?: any): Observable<IPersona[]> {
    return this.httpClient.get<IPersona[]>(this.url, { params: params });
  }

  public getById$(id: string): Observable<IPersona[]> {
    return this.httpClient.get<IPersona[]>(`${this.url}${id}/`);
  }

  public add$(data: any): Observable<IPersona[]> {
    return this.httpClient.post<IPersona[]>(this.url, data);
  }

  public update$(id: string, data: any): Observable<IPersona[]> {
    return this.httpClient.put<IPersona[]>(`${this.url}${id}/`, data);
  }

  public delete$(id: string): Observable<IPersona[]> {
    return this.httpClient.delete<IPersona[]>(`${this.url}${id}/`);
  }
}


@Injectable()
export class PersonasReactiveService {
  personas: Observable<Persona[]>;
  private _personas: BehaviorSubject<Persona[]>;
  private dataStore: {
    personas: Persona[],
  };
  constructor(private personasService: PersonasService,
    private snackBar: MatSnackBar) {

    this.dataStore = { personas: [] };
    this._personas = <BehaviorSubject<Persona[]>>new BehaviorSubject([]);
    this.personas = this._personas.asObservable();
  }

  public getList(params?: any) {
    return this.personasService
      .getList$(params)
      // .pipe(map(res => res.results))
      .subscribe(data => {
        this.snackBar.open(MESSAGES.persona.getMany, MESSAGES.actions.get, snackBarDuration);
        this.dataStore.personas = data;
        this._personas.next(Object.assign({}, this.dataStore).personas);
      }, error => console.warn('Could not load personas.'),
      );
  }

  public add(persona: any) {
    this.personasService.add$(persona)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.persona.post, MESSAGES.actions.post, snackBarDuration);
        this.dataStore.personas.push(data);
        this._personas.next(Object.assign({}, this.dataStore).personas);
      }, error => console.warn('Could not create persona.'));
  }


  public update(id: string, persona: any) {
    this.personasService.update$(id, persona)
      .subscribe((data: any) => {
        this.snackBar.open(MESSAGES.persona.put, MESSAGES.actions.put, snackBarDuration);
        this.dataStore.personas.forEach((a, index) => {
          if (a.id === data.id) { this.dataStore.personas[index] = data; }
        });
        this._personas.next(Object.assign({}, this.dataStore).personas);
      }, error => console.warn('Could not update persona.'));
  }

  public delete(id: string) {
    this.personasService.delete$(id)
      .subscribe(response => {
        this.snackBar.open(MESSAGES.persona.delete, MESSAGES.actions.delete, snackBarDuration);
        this.dataStore.personas.forEach((a, index) => {
          if (a.id === id) { this.dataStore.personas.splice(index, 1); }
        });
        this._personas.next(Object.assign({}, this.dataStore).personas);
      }, error => console.warn('Could not delete persona.'));
  }
}
