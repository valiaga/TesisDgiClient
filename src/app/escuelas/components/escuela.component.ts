import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Escuela } from '../shared/escuela';

@Component({
  selector: 'dgi-escuela',
  template: `
    <mat-card>
      <mat-card-header>
      <!-- <mat-card-title fxLayout  fxLayoutAlign="space-between stretch"> -->
        <!-- Esta es mi Tesis -->
        <span flex></span>
        <button mat-icon-button class=""
        color="primary"
        [matMenuTriggerFor]="escuelaMenu"
        >
          <mat-icon>more_vert</mat-icon>
        </button>
        <!-- <mat-card-subtitle></mat-card-subtitle> -->
      <!-- </mat-card-title> -->
        <!-- <img mat-card-avatar src="{{logo}}"> -->
      </mat-card-header>
      <img mat-card-image src="{{ logo }}" alt="{{ logo }}"/>
      <mat-card-content>
      {{ nombre }}
        <!-- <img src="{{logo}}"/> -->
      </mat-card-content>
    </mat-card>

    <mat-menu #escuelaMenu="matMenu" yPosition="below" xPosition="before">
      <!-- <button mat-menu-item [routerLink]="['/tesis-procesos', tesisProceso.id]">
        <span>Ver</span>
      </button> -->
      <button mat-menu-item (click)="onDeleteEscuela.emit(id)">
        <!-- <mat-icon>dialpad</mat-icon>-->
        <span>Eliminar</span>
      </button>
      <button mat-menu-item><span>Settings</span></button>
    </mat-menu>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    .mat-card img {
      width: 150px;
      height: 130px;
    }

    /*
    .mat-card {
    }*/

    .mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    /*
    .mat-icon-button {
      position: absolute;
      right: 0px;
    }
    */
    /*
    .mat-card {
      flex-flow: column;
      justify-content: space-between;
    }*/

    `,
  ],
})
export class EscuelaComponent implements OnInit {

  @Input() escuela: Escuela;
  @Output() onDeleteEscuela = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  get nombre() {
    return this.escuela.nombre;
  }

  get logo() {
    return this.escuela.logo;
  }

  get id() {
    return this.escuela.id;
  }
}
