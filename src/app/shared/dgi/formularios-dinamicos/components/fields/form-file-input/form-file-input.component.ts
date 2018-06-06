import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../models';

@Component({
    selector: 'dgi-form-file-input',
    templateUrl: 'form-file-input.component.html',
    styleUrls: ['form-file-input.component.scss']
})

export class DgiFormFileInputComponent implements OnInit {
    public config: FieldConfig;
    public group: FormGroup;


    public files: File | FileList;

    constructor() { }

    ngOnInit() { }
}
