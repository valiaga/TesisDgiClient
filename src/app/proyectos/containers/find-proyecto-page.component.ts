import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Proyecto } from '../models/proyecto';
import { ProyectoService } from '../shared/proyecto.service';

@Component({
  selector: 'dgi-find-proyecto-page',
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

  // private proyectos$: Observable<Proyecto>
  private buscarQuery$: Observable<string>;
  private proyectos$: Observable<Proyecto[]>;
  private cargando$: Observable<Boolean>;
  private error$: Observable<string>;

  constructor(private proyectoService: ProyectoService) { }

  ngOnInit() {
    // this.proyectos$ = this.proyectoService.getProyectos$();
  }

  buscar(query: string){
    // this.
  }

}
