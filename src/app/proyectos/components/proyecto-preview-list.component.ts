import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../models/proyecto'

@Component({
  selector: 'dgi-proyecto-preview-list',
  template: `
    <!--<div *ngIf="proyectos else noData"> -->
      <dgi-proyecto-preview *ngFor="let proyecto of proyectos" [proyecto] = "proyecto"></dgi-proyecto-preview>
    <!-- </div> -->
    <!--
    <ng-template #noData >
      <mat-card>No hay Datos</mat-card>
    </ng-template> -->    
    `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 25px;
    }

    div {
      display: flex;
    }

    `
  ]
})
export class ProyectoPreviewListComponent implements OnInit {

  @Input() proyectos: Proyecto[];

  constructor() { }

  ngOnInit() {
  }

}
