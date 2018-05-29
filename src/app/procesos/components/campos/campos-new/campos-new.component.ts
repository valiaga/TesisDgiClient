import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CamposService } from '../../../../campos/shared/campos.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
    selector: 'dgi-campos-new',
    templateUrl: 'campos-new.component.html',
    styleUrls: ['campos-new.component.scss'],
})

export class CamposNewComponent implements OnInit {
    public tipoCampo = new FormControl();
    public tiposDeCampos: any[];

    public pasoOneForm: FormGroup;
    public pasoTwoForm: FormGroup;
    public pasoThreeForm: FormGroup;

    constructor(private dialogRef: MatDialogRef<CamposNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private camposService: CamposService,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
    ) { }

    ngOnInit() {
        this.loadTipoDeCampos();

        this.buildForm();
    }

    private buildForm() {
        this.pasoOneForm = this.formBuilder.group({
            type: ['', Validators.required]
        });
        // const dsa = this.pasoOneForm.get('tipoCampo').value;
        console.log(this.data.formulario.tarea);

        this.pasoTwoForm = this.formBuilder.group({
            id: [''],
            formulario: [this.data.formulario.id],
            label: ['', Validators.required],
            name: ['', Validators.required],
            required: [false, Validators.required],
            width: [100, Validators.required],
            placeholder: [''],
            model: [''],
            json: [''],
            icon: [''],
            prefix: [''],
            hint_start: [''],
            hint_end_count_text: [false],
            disabled: [false],
            multiselect: [false],
            orden: ['', Validators.required],
        });

        this.pasoThreeForm = this.formBuilder.group({});
    }

    public save() {
        console.log('save');

        const pasoOneFormValue = this.pasoOneForm.value;
        const pasoTwoFormValue = this.pasoTwoForm.value;
        const pasoThreeFormValue = this.pasoThreeForm.value;


        const pasoOneFormValid = this.pasoOneForm.valid;
        const pasoTwoFormValid = this.pasoTwoForm.valid;
        const pasoThreeFormValid = this.pasoThreeForm.valid;

        const data = Object.assign(pasoOneFormValue, pasoTwoFormValue);
        console.log(data);
        console.log(pasoOneFormValid);
        console.log(pasoTwoFormValid);
        console.log(pasoThreeFormValid);


        if (pasoOneFormValid && pasoTwoFormValid && pasoThreeFormValid) {
            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.camposService.save$(data).subscribe(res => {
                            this.dialogRef.close(this.data.formulario.tarea);
                            this.pasoOneForm.reset();
                            this.pasoTwoForm.reset();
                            this.pasoThreeForm.reset();
                        });
                    } else {
                    }
                });
        }
    }

    public loadTipoDeCampos() {
        this.tiposDeCampos = [
            {
                name: 'Simples',
                campos: [
                    { value: 'input', viewValue: 'Input' },
                    { value: 'number', viewValue: 'Number' },
                    { value: 'select', viewValue: 'Select' },
                    { value: 'email', viewValue: 'Email' },
                    { value: 'tel', viewValue: 'Teléfono' },
                    { value: 'textarea', viewValue: 'Textarea' },
                    { value: 'slideToggle', viewValue: 'SlideToggle' },
                    { value: 'password', viewValue: 'Password' },
                    { value: 'radio', viewValue: 'Radio' },
                    { value: 'checkbox', viewValue: 'Checkbox' },
                ]
            },
            {
                name: 'Complejo',
                campos: [
                    // { value: 'datepicker', viewValue: 'Datepicker' },
                    { value: 'date', viewValue: 'Datepicker' },
                ]
            },
            {
                name: 'Botones',
                campos: [
                    { value: 'buttonSubmit', viewValue: 'Botón submit' },
                ]
            },
        ];
    }
}
