import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dgi-proyecto-search',
  template: `
  <mat-card>
    <!-- <mat-card-title>Encontrar Proyecto de tesis</mat-card-title> -->
    <mat-card-content>
      <mat-input-container>
        <input matInput 
            placeholder="Buscador para un proyecto" 
            [value]="query" 
            (keyup)="onBuscar($event.target.value)"
            >
      </mat-input-container>
      <mat-spinner [class.show]="buscando" [diameter]="30" [strokeWidth]="3"></mat-spinner>
    </mat-card-content>
    <mat-card-footer><span *ngIf="error">{{error}}</span></mat-card-footer>
  </mat-card>
  `,
  styles: [
    `
    mat-card-title,
    mat-card-content,
    mat-card-footer {
      display: flex;
      justify-content: center;
    }

    mat-card-footer {
      /* color: #FF0000; */
      padding: 5px 0;
    }
    .mat-form-field {
      min-width: 300px;
    }
    .mat-spinner {
      position: relative;
      top: 10px;
      left: 10px;
      opacity: 0.0;
      /* padding-left: 60px; Make room for the spinner */
      padding-left: 0px; /* Make room for the spinner */
    }
    .mat-spinner.show {
      opacity: 1.0;
    }
    `
  ]
})
export class ProyectoSearchComponent implements OnInit {

  @Input() query = '';
  @Input() buscando = false;
  @Input() error = '';
  @Output() buscar = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onBuscar(term){
    // if (term) {
      this.buscar.emit(term);
    // }
  }
}
