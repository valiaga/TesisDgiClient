import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Component({
  selector: 'dgi-proyecto-authors',
  template: `
    <h5 mat-subheader>Escrito Por:</h5>
    <span>
      {{ tesista | dgiAddCommas }}
    </span>
  `,
  styles: [
    `
    h5 {
      margin-bottom: 5px;
    }
    `,
  ],
})
export class ProyectoAuthorsComponent implements OnInit {

  @Input() proyecto: Proyecto;
  constructor() { }

  ngOnInit() {
  }

  get tesista(){
    return this.proyecto.tesista;
  }

}
