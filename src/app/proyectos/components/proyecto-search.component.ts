import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'dgi-proyecto-search',
  template: `
  <mat-card>
    <mat-card-title>Encontrar Proyecto de tesis</mat-card-title>
    <mat-card-content>
      <mat-input-container>
        <input matInput placeholder="Search for a book" [value]="query" (keyup)="buscar.emit($event.target.value)">
      </mat-input-container>
      <mat-spinner [class.show]="buscando" [diameter]="30" [strokeWidth]="3"></mat-spinner>
    </mat-card-content>
    <mat-card-footer><span *ngIf="error">{{error}}</span></mat-card-footer>
  </mat-card>
  `,
  styles: []
})
export class ProyectoSearchComponent implements OnInit {

  @Input() query = '';
  @Input() buscando = false;
  @Input() error = '';
  @Input() buscar = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
