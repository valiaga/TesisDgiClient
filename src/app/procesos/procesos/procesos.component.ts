import { Provider } from '@angular/core/core';
import { Component, OnInit } from '@angular/core';

import { ProcesoService } from "./../shared/proceso.service";
import { Proceso } from './../modelos/proceso.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'dgi-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
  providers: [ProcesoService]
})
export class ProcesosComponent implements OnInit {
  public procesos$: Observable<Proceso[]>;

  constructor(private procesoService: ProcesoService) { }

  ngOnInit() {
    this.procesos$ = this.procesoService.procesos;
    this.getProcesos();
  }

  getProcesos() {
    this.procesoService.getAllProcesos();
  }
}
