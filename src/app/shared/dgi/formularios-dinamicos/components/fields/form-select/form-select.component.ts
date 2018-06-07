import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models/field-config';
import { FormWidthToolsService } from '../../../tools/form-width-tools.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'dgi-form-select',
  templateUrl: 'form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class DgiFormSelectComponent implements OnInit {
  public config: FieldConfig;
  public group: FormGroup;
  private edit: Subject<string> = new Subject<string>();

  public JSONparse: any[] = [];

  constructor(private formWidthToolsService: FormWidthToolsService) { }

  ngOnInit() {

    this.JSONparse = (new Function('return ' + this.config.json + ';')());
  }

  public onEdit() {
    this.edit.next();
  }

  public onUpdate(): Observable<any> {
    return this.edit.asObservable();
  }

  public getWidthControlClass() {
    return this.formWidthToolsService.getWidthControlClass(this.config);
  }
}
