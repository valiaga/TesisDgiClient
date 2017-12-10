import { Provider } from '@angular/core/core';
import { Component, OnInit } from '@angular/core';

import { ProcesoService } from "./../shared/proceso.service";
import { Proceso } from './../modelos/proceso.model';

@Component({
  selector: 'dgi-procesos',
  templateUrl: './procesos.component.html',
  styleUrls: ['./procesos.component.scss'],
  providers: [ProcesoService]
})
export class ProcesosComponent implements OnInit {
  public procesos: Proceso[] = []

  constructor(private procesoService: ProcesoService) { }

  ngOnInit() {
    this.getProcesos();
  }

  getProcesos(){
    this.procesoService.getProcesos$()
      .subscribe(res => this.procesos = res.json());
  }
}
