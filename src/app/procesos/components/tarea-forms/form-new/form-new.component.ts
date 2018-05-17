import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'dgi-form-new',
    templateUrl: 'form-new.component.html',
    styleUrls: ['form-new.component.scss'],
})

export class FormNewComponent implements OnInit {

    public formForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<FormNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
    ) { }

    ngOnInit() {

        this.buildForm();
    }


    public buildForm() {
        const controls = this.initializeControls();
        this.formForm = this.formBuilder.group(controls);
    }

    public initializeControls() {
        const controls = {
            id: [''],
            nombre: ['', [Validators.required]],
            alias: ['', []],
            descripcion: [],
            tarea: [this.data.tareaId, [Validators.required]],
            orden: ['', [Validators.required]],
            width: [100, [Validators.required]],
        };

        return controls;
    }
}
