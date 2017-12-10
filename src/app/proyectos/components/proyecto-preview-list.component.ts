import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../models/proyecto'

@Component({
  selector: 'dgi-proyecto-preview-list',
  template: `
    <dgi-proyecto-preview *ngFor="let proyecto in proyectos" [proyecto] = "proyecto"></dgi-proyecto-preview>
  `,
  styles: [
    `
    /*
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }*/
    `
  ]
})
export class ProyectoPreviewListComponent implements OnInit {

  @Input() proyectos: Proyecto[];

  constructor() { }

  ngOnInit() {
  }

}
