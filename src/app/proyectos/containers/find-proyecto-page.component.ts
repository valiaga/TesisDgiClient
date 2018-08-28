import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Proyecto } from '../models/proyecto';
import { ProyectosService } from '../shared/proyectos.service';
import { Observable, Subject } from 'rxjs';
import {
  tap, debounceTime,
  distinctUntilChanged, switchMap, map,
} from 'rxjs/operators';


@Component({
  selector: 'dgi-find-proyecto-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- [query]="buscarQuery$ | async" -->
    <dgi-proyecto-search
        [buscando]="cargando$ | async"
        [error]="error$ | async"
        (buscar)="buscar($event)">
        </dgi-proyecto-search>
      <dgi-proyecto-preview-list
      [proyectos]="proyectos$ | async">
      </dgi-proyecto-preview-list>
  `,
  styles: [],
})
export class FindProyectoPageComponent implements OnInit {

  public buscarQuery$: Observable<string>;
  public proyectos$: Observable<Proyecto[]>;
  public cargando$: Observable<Boolean>;
  public error$: Observable<string>;

  public debouncer = new Subject<string>();

  constructor(private proyectosService: ProyectosService) { }

  ngOnInit() {
    // this.proyectos$ = this.proyectoService.getProyectos$().map(res => res.results);
    this.proyectos$ = this.debouncer
      .pipe(
        tap(() => {
          this.cargando$ = new Observable<boolean>((observer) => {
            observer.next(true);
          });
        }),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => this.proyectosService.searchProyectos$(term)),
        map(res => res.results),
        tap(() => {
          this.cargando$ = new Observable<boolean>((observer) => {
            observer.next(false);
          });
        }),
      );
  }

  buscar(query: string) {
    this.debouncer.next(query);
  }
}
