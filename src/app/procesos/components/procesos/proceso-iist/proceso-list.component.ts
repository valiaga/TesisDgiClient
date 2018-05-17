import { Component, OnInit, Output, Input } from '@angular/core';
import { Proceso } from '../../../models/proceso.model';


@Component({
  selector: 'dgi-proceso-list',
  template: `
    <dgi-proceso *ngFor="let proceso of procesos" [proceso] = "proceso"></dgi-proceso>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      /*justify-content: center; */
      /* margin-top: 25px; */
    }
    `
  ]
})
export class ProcesoListComponent implements OnInit {

  @Input() procesos: Proceso[];

  constructor() { }

  ngOnInit() {
  }

}
