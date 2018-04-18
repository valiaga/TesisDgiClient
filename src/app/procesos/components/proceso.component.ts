import { Component, OnInit, Input } from '@angular/core';
import { Proceso } from '../models/proceso.model';

@Component({
  selector: 'dgi-proceso',
  template: `
    <mat-card  class="proceso-card" role="region">
      <mat-card-header>
        <img mat-card-avatar src="https://thumbs.dreamstime.com/z/diploma-y-casquillo-eps-de-la-graduaci%C3%B3n-1689288.jpg">
          <mat-card-title>{{ nombre }}</mat-card-title>
          <!--<mat-card-subtitle>Proceso de Tesis para titulo profesional de pregrado</mat-card-subtitle>-->
        </mat-card-header>
      <mat-divider></mat-divider>
      <mat-card-content>
        <p> {{descripcion}} </p>
          <mat-slide-toggle color="warn" [checked]="activo" >
          Activo
          </mat-slide-toggle>
      </mat-card-content>
      <mat-card-actions align = 'end'>
        <button color="accent" mat-button>LIKE</button>
        <!-- <button color="accent"  [routerLink]="['/procesos/', proceso.id]" mat-button >DETALLE</button> -->
        <button color="accent"  [routerLink]="['/procesos/', id]" mat-button >DETALLE</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
    .proceso-card {
      width: 400px;
      box-sizing: border-box;
      /* margin: 16px */
    }
    `
  ]
})
export class ProcesoComponent implements OnInit {

  @Input() proceso: Proceso;

  constructor() { }

  ngOnInit() {
  }

  get id() {
    return this.proceso.id;
  }

  get activo() {
    return this.proceso.activo;
  }

  get nombre() {
    return this.proceso.nombre;
  }

  get descripcion() {
    return this.proceso.descripcion;
  }
}
