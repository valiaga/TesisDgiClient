import { Component, OnInit, Input } from '@angular/core';
import { Etapa } from '../../../etapas/shared/etapa';

@Component({
  selector: 'dgi-step-list',
  template: `
    <dgi-step *ngFor="let etapa of etapas" [etapa]="etapa"></dgi-step>
  `,
  styles: []
})
export class StepListComponent implements OnInit {

  @Input() etapas: Etapa[];

  constructor() { }

  ngOnInit() {
    // console.log('this.etapas.length')
    // console.log(this.etapas.length)
  }

}
