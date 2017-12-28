import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Proceso } from '../../procesos/shared/proceso.model';
import { ProcesoService } from '../../procesos/shared/proceso.service';

@Component({
  selector: 'dgi-list-proceso-page',
  template: `
    <dgi-proceso-list
      [procesos]="procesos$ | async"
      ></dgi-proceso-list>
  `,
  styles: []
})
export class ListProcesoPageComponent implements OnInit {
  public procesos$: Observable<Proceso[]>;

  constructor(private procesoService:ProcesoService) { }

  ngOnInit() {
    this.procesos$ = this.procesoService.procesos;
    this.getProcesos();
  }

  getProcesos() {
    this.procesoService.getAllProcesos();
  }
}
