import { Component, OnInit } from '@angular/core';

import { ProcesoService } from "./../shared/proceso.service";
import { Proceso } from './../modelos/proceso.model';

@Component({
  selector: 'dgi-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  public procesos: Proceso[] = []

  constructor(private procesoService: ProcesoService) { }

  ngOnInit() {
    // console.log("Hola")
    this.getProcesos();
  }

  getProcesos(){
    this.procesoService.getRecentProcesos()
      .then(res => {
        this.procesos = res.results;
        console.log(res.options);
      });
    // this.procesoService.getProcesos()
    //   .then(procesos => this.procesos = procesos)
  }

}
