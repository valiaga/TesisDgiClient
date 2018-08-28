import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Proceso } from '../../../procesos/models/proceso.model';
import { ProcesosReactiveService } from '../../../procesos/shared/proceso.service';

@Component({
  selector: 'dgi-list-proceso-page',
  template: `
    <dgi-proceso-list
      [procesos]="procesos$ | async"
      ></dgi-proceso-list>
  `,
  styles: [],
})
export class ListProcesoPageComponent implements OnInit {
  public procesos$: Observable<Proceso[]>;

  constructor(private procesosReactiveService: ProcesosReactiveService) { }

  ngOnInit() {
    this.procesos$ = this.procesosReactiveService.procesos;
    this.getProcesos();
  }

  getProcesos() {
    this.procesosReactiveService.getAll();
  }
}
