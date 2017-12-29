import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'dgi-flow-buttons-footer',
  template: `
  <div class="buttons-footer">
    <button class="button-back" mat-button 
      [disabled]="verticalStepper.selectedIndex === 0"
      (click)="goBackPaso(verticalStepper)">
    <mat-icon>arrow_back</mat-icon>
      Back General</button>
    <!--<span flex></span> --> 
    <button class="button-next" mat-button 
      [disabled]="verticalStepper.selectedIndex === (verticalStepper._steps && verticalStepper._steps.length-1)"
      (click)="goNextPaso(verticalStepper)">
    Next General
    <mat-icon>arrow_forward</mat-icon>
    </button>
  </div>
  `,
  styleUrls: ['./flow-buttons-footer.component.scss']
})
export class FlowButtonsFooterComponent implements OnInit {

  @Input() verticalStepper: MatStepper;

  constructor() { }

  ngOnInit() {
  }

  goBackPaso(stepper: MatStepper) {
    stepper.previous();
  }
  
  goNextPaso(stepper: MatStepper) {
    stepper.next();
  }
}
