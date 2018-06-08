import { Component, OnInit, EventEmitter } from '@angular/core';
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
  public onUpdate = new EventEmitter<string>();

  public JSONparse: any[] = [];

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {

    this.JSONparse = (new Function('return ' + this.config.json + ';')());
  }

  public update(fieldId: string) {
    return this.onUpdate.emit(fieldId);
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }
}
