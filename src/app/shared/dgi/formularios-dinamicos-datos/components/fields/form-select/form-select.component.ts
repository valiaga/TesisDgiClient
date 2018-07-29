import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { SelectModelService } from './select-model.service';

@Component({
  selector: 'dgi-form-select',
  templateUrl: 'form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class DgiFormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public JSONparse: any[] = [];

  constructor(private formWidthToolsService: FormWidthToolsService,
    private selectModelService: SelectModelService) { }

  ngOnInit() {
    if (this.config.model_name) {
      const params = {
        data_model_name: this.config.model_name,
        data_model_pk: this.config.model_pk,
        data_model_label: this.config.model_label,
      };
      this.selectModelService.getValuesByModel(params).subscribe(response => {
        this.JSONparse = response;
        console.log(this.JSONparse);
      });

    } else {
      // console.log(this.config.json);
      this.JSONparse = (new Function('return ' + this.config.json + ';')());
    }

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
