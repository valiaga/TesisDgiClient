import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { SelectModelService } from './select-model.service';

@Component({
  selector: 'dgi-form-select',
  templateUrl: 'form-select.component.html',
  styleUrls: ['./form-select.component.scss'],
})
export class DgiFormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  public onUpdate = new EventEmitter<any>();

  public JSONparse: any[] = [];

  constructor(private formWidthToolsService: FormWidthToolsService,
    private selectModelService: SelectModelService) { }

  ngOnInit() {
    if (this.config.model_name) {
      // console.log(this.config.model);
      const params = {
        data_model_name: this.config.model_name,
        data_model_pk: this.config.model_pk,
        data_model_label: this.config.model_label,
      };
      this.selectModelService.getValuesByModel(params).subscribe(response => {
        this.JSONparse = response;
        // console.log(this.JSONparse);
      });

    } else {
      // console.log(this.config.json);
      this.JSONparse = (new Function('return ' + this.config.json + ';')());
    }

  }

  public update(field: FieldConfig) {
    const dataReturn = { id: field.id, type: field.type };
    return this.onUpdate.emit(dataReturn);
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }
}
