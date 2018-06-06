import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';

@Component({
  selector: 'dgi-form-select',
  templateUrl: 'form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class DgiFormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;

  public JSONparse: any[] = [];

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {

    this.JSONparse = (new Function('return ' + this.config.json + ';')());
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }

  // public mustShowErrors(controlName: string): boolean {
  //   return this.formToolsService.mustShowErrors(this.group, controlName);
  // }

  // public getControlErrors(controlName: string) {
  //   return this.formToolsService.getControlErrors(this.group, controlName);
  // }

}
