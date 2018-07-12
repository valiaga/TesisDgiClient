import { Component, OnInit, Input } from '@angular/core';
import { Proceso } from '../../../procesos/models/proceso.model';


@Component({
  selector: 'dgi-proceso',
  template: `
  <mat-card class="proceso-card" role="region">
    <!-- <mat-card-header>
      <img mat-card-avatar src="https://thumbs.dreamstime.com/z/diploma-y-casquillo-eps-de-la-graduaci%C3%B3n-1689288.jpg">
        <mat-card-title>{{proceso.nombre}}</mat-card-title>
      </mat-card-header>
    <mat-divider></mat-divider>-->
    <mat-card-content>
      <p> <b>{{ nombre | uppercase }}</b>  </p>
      <!--  <mat-slide-toggle color="warn" [checked]="proceso.activo" >
        Activo
        </mat-slide-toggle>-->
    </mat-card-content>
    <mat-card-actions align = 'end'>
      <!-- <button color="accent" mat-button>LIKE</button>-->
      <!-- <button color="accent"  [routerLink]="['/seguimiento/proyectos/', proceso.id]" mat-button >INGRESAR</button> -->
      <button color="accent"  [routerLink]="['./', id]" mat-button >INGRESAR</button>
    </mat-card-actions>
  </mat-card>

  <mat-card>
    <mat-card-header>
      <mat-card-title fxLayout  fxLayoutAlign="space-between stretch">
        Esta es mi Tesis
        <button mat-icon-button
        color="primary"
        (click)="add()">
          <mat-icon>playlist_add</mat-icon>
        </button>
      </mat-card-title>
    <mat-card-subtitle>
      subtitle
    </mat-card-subtitle>
    <img mat-card-avatar>
  </mat-card-header>
  </mat-card>
  `,
  styles: [
    `
    .proceso-card {
      width: 30rem;
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
    console.log(this.proceso);
    return this.proceso.id;
  }

  get nombre() {
    console.log(this.proceso);
    return this.proceso.nombre;
  }
}
