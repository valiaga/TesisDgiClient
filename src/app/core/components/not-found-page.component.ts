import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-not-found-page',
  template: `
  <mat-card>
    <mat-card-title>404: Not Found</mat-card-title>
    <mat-card-content>
      <p>Hey! Parece que esta página aún no existe.</p>
    </mat-card-content>
    <mat-card-actions>
      <button mat-raised-button color="primary" routerLink="/">Regresar a Home</button>
    </mat-card-actions>
  </mat-card>
  `,
  styles: [
    `
    :host {
      text-align: center;
    }
    `,
  ]
})
export class NotFoundPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
