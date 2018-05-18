import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DgiToolsService } from './services/tools.service';
import { MESSAGES_FORM_VALIDATORS as message } from './messages';

@Component({
  selector: 'dgi-show-error',
  template: `
    <!--
    <small *ngIf="mustShowErrors()" class="float-right" [ngClass]="{'text-error': mustShowErrors() }">
        {{ getMsmError }}
    </small> -->
    <mat-error *ngIf="mustShowErrors()">
      <span>{{ getMsmError }}</span>
      <!-- <dgi-form-validator [hasError]="getControlErrors(config.name)"></dgi-form-validator> -->
    </mat-error>
    `,
  styleUrls: ['./show-error.component.scss'],
})
export class DgiShowErrorComponent implements OnInit {
  @Input() controlName: string;
  @Input() group: FormGroup;

  constructor(private dgiToolsService: DgiToolsService) { }

  ngOnInit() { }

  public getControlErrors(): any {
    return this.dgiToolsService.getControlErrors(this.group, this.controlName);
  }

  public mustShowErrors(): boolean {
    return this.dgiToolsService.mustShowErrors(this.group, this.controlName);
  }

  get getMsmError() {
    const hasError = this.getControlErrors();
    if (hasError.required) {
      return message.required;
    } else if (hasError.minlength) {
      return `${message.minlengthRequiredLength}
        ${hasError.minlength.requiredLength}
        ${message.minlengthActualLength}
        ${hasError.minlength.actualLength}`;
    } else if (hasError.maxlength) {
      return `${message.maxlengthRequiredLength}
        ${hasError.maxlength.requiredLength}
        ${message.maxlengthActualLength}
        ${hasError.maxlength.actualLength}`;
    } else if (hasError.email) {
      return message.email;
    } else if (hasError.min) {
      return `${message.minRequired}${hasError.min.min}
            ${message.minActual}${hasError.min.actual}`;
    } else if (hasError.max) {
      return `${message.maxRequired}${hasError.max.max}
            ${message.maxActual}${hasError.max.actual}`;
    } else if (hasError.number) {
      return message.number;
    } else if (hasError.uppercase) {
      return message.uppercase;
    } else if (hasError.lowercase) {
      return message.lowercase;
    } else if (hasError.empty) {
      return message.empty;
    } else if (hasError.positiveNumber) {
      return message.positiveNumber;
    } else if (hasError.notNegativeNumber) {
      return message.notNegativeNumber;
    } else {
      return message.other;
    }
  }
}
