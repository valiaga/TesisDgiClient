import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from '../shared/proyecto.service';

import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';


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
  styles: []
})
export class FindProyectoPageComponent implements OnInit {

  private buscarQuery$: Observable<string>;
  private proyectos$: Observable<Proyecto[]>;
  private cargando$: Observable<Boolean>;
  private error$: Observable<string>;

  private debouncer = new Subject<string>();

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    // this.proyectos$ = this.proyectoService.getProyectos$().map(res => res.results);
    this.proyectos$ = this.debouncer
      .do(() => {
        this.cargando$ = new Observable<boolean>((observer) => {
          observer.next(true)
        });
      })
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(term => this.proyectoService.searchProyectos$(term).map(res => res.results))
      .do(() => {
        this.cargando$ = new Observable<boolean>((observer) => {
          observer.next(false)
        });
      })
  }

  buscar(query: string){
    this.debouncer.next(query);
  }
}
