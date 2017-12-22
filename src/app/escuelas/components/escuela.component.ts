import { Component, OnInit, Input } from '@angular/core';
import { Escuela } from '../shared/escuela';

@Component({
  selector: 'dgi-escuela',
  template: `
    <mat-card>
      <mat-card-header>
        <!-- <img mat-card-avatar src="{{logo}}"> -->
      </mat-card-header>
      <img mat-card-image src="{{ logo }}" alt="{{ logo }}"/>
      <mat-card-content>
      {{ nombre }}
        <!-- <img src="{{logo}}"/> -->
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
    :host {
      display: flex;
    }

    .mat-card img {
      width: 150px;
      height: 150px;
    }

    /*
    .mat-card {
    }*/

    .mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    /*
    .mat-card {
      flex-flow: column;
      justify-content: space-between;
    }*/

    `
  ]
})
export class EscuelaComponent implements OnInit {

  @Input() escuela: Escuela;

  constructor() { }

  ngOnInit() {
  }

  get nombre(){
    return this.escuela.nombre;
  }

  get logo(){
    return this.escuela.logo;
  }
}
