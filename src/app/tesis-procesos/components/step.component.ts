import { Component, OnInit, Input } from '@angular/core';
import { Etapa } from '../../etapas/shared/etapa';

@Component({
  selector: 'dgi-step',
  template: `
  <mat-step label="{{ id }}" >
    <ng-template matStepLabel>{{ nombre }}</ng-template>
    {{ descripcion }} 
  </mat-step>
  `,
  styles: []
})
export class StepComponent implements OnInit {

  @Input() etapa: Etapa;

  constructor() { }

  ngOnInit() {
  }

  get id(){
    return this.etapa.id;
  }

  get nombre(){
    return this.etapa.nombre;
  }

  get descripcion(){
    return this.etapa.descripcion;
  }
}