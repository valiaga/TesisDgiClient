import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'dgi-flow-buttons-footer',
  template: `
  <div class="buttons-footer">
    <button class="button-back" mat-button
      [disabled]="sidenavEtapas.selectedIndex === 0"
      (click)="goBackEtapa(sidenavEtapas)">
    <mat-icon>arrow_back</mat-icon>
      Anterior</button>
    <!--<span flex></span> -->
    <button class="button-next" mat-button
      [disabled]="sidenavEtapas.selectedIndex === (sidenavEtapas._steps && sidenavEtapas._steps.length-1)"
      (click)="goNextEtapa(sidenavEtapas)">
      Siguiente
    <mat-icon>arrow_forward</mat-icon>
    </button>
  </div>
  `,
  styleUrls: ['./flow-buttons-footer.component.scss']
})
export class FlowButtonsFooterComponent implements OnInit {

  @Input() sidenavEtapas: MatStepper;

  constructor() { }

  ngOnInit() {
  }

  goBackEtapa(stepper: MatStepper) {
    stepper.previous();
  }

  goNextEtapa(stepper: MatStepper) {
    stepper.next();
  }
}
