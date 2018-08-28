import { Component, OnInit, Input } from '@angular/core';
import { Proceso } from '../../../procesos/models/proceso.model';


@Component({
  selector: 'dgi-proceso',
  templateUrl: 'proceso.component.html',
  styles: [
    `
    .proceso-card {
      width: 30rem;
      box-sizing: border-box;
      /* margin: 16px */
    }
    `,
  ],
})
export class ProcesoComponent implements OnInit {

  @Input() proceso: Proceso;

  constructor() { }

  ngOnInit() {
  }

  get id() {
    return this.proceso.id;
  }

  get nombre() {
    return this.proceso.nombre;
  }
}
