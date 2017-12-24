import { Component, OnInit, Input } from '@angular/core';

import { ProcesoService } from "./../shared/proceso.service";
import { Proceso } from './../modelos/proceso.model';

@Component({
  selector: 'dgi-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  @Input() public procesos: Proceso[];

  constructor() { }

  ngOnInit() {
  }
}
