import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CamposService } from '../../../../campos/shared/campos.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
    selector: 'dgi-campos-edit',
    templateUrl: 'campos-edit.component.html',
    styleUrls: ['campos-edit.component.scss'],
})

export class CamposEditComponent implements OnInit {
    // public tipoCampo = new FormControl();
    public tipoCampo: string;
    // public tiposDeCampos: any[];

    // public pasoOneForm: FormGroup;
    public pasoTwoForm: FormGroup;
    public pasoThreeForm: FormGroup;

    public accept_fileinput = {
        png: false,
        jpg: false,
        pdf: false,
        docx: false,
    };

    public isModelOrJSON: FormControl = new FormControl();

    constructor(private dialogRef: MatDialogRef<CamposEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private camposService: CamposService,
        private snackBar: MatSnackBar,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
    ) { }

    ngOnInit() {
        // this.loadTipoDeCampos();

        this.buildForm();
        this.getCampoById(this.data.campoId);
        this.subscribeChangesIsModelOrJSON();
    }

    public subscribeChangesIsModelOrJSON() {
        this.isModelOrJSON.valueChanges.subscribe(res => {
            if (res === 'JSON') {
                this.pasoTwoForm.controls['model_name'].setValue('');
                this.pasoTwoForm.controls['model_pk'].setValue('');
                this.pasoTwoForm.controls['model_label'].setValue('');
            } else {
                this.pasoTwoForm.controls['json'].setValue('');
            }
        });
    }

    public getCampoById(campoId) {
        this.camposService.getById$(campoId)
            .subscribe(this.loadCampo.bind(this));
    }

    private loadCampo(campo) {
        this.tipoCampo = campo.type;
        this.patchForms(campo);
    }

    private patchForms(campo) {

        if (this.pasoTwoForm) {

            this.pasoTwoForm.patchValue({
                id: campo.id,
                formulario: campo.formulario,
                label: campo.label,
                name: campo.name,
                required: campo.required,
                width: campo.width,
                placeholder: campo.placeholder,

                model_name: campo.model_name,
                model_pk: campo.model_pk,
                model_label: campo.model_label,

                json: campo.json,
                icon: campo.icon,
                prefix: campo.prefix,
                hint_start: campo.hint_start,
                hint_end_count_text: campo.hint_end_count_text,
                disabled: campo.disabled,
                multiselect: campo.multiselect,
                order: campo.order,
                multiple_fileinput: campo.multiple_fileinput,
            });
        }
        if (campo.model_name) {
            this.isModelOrJSON.setValue('MODEL');
        } else {
            this.isModelOrJSON.setValue('JSON');
        }
    }

    private buildForm() {
        // this.pasoOneForm = this.formBuilder.group({
        //     type: ['', Validators.required]
        // });
        this.pasoTwoForm = this.formBuilder.group({
            id: [''],
            formulario: [''],
            label: ['', Validators.required],
            name: ['', Validators.required],
            required: [false, Validators.required],
            width: [100, Validators.required],
            placeholder: [''],

            model_name: [''],
            model_pk: [''],
            model_label: [''],

            json: [''],
            icon: [''],
            prefix: [''],
            hint_start: [''],
            hint_end_count_text: [false],
            disabled: [false],
            multiselect: [false],
            order: ['', Validators.required],
            multiple_fileinput: [false],
        });

        this.pasoThreeForm = this.formBuilder.group({});
    }

    private prepareDataAccept() {
        // if (this.pasoOneForm.value.type !== 'fileinput') {
        //     return '';
        // }
        let data = '';

        if (this.accept_fileinput.docx) {
            data = `${data}.dock,`;
        } if (this.accept_fileinput.jpg) {
            data = `${data}.jpg,`;
        } if (this.accept_fileinput.pdf) {
            data = `${data}.pdf,`;
        } if (this.accept_fileinput.png) {
            data = `${data}.png,`;
        }
        data = data.slice(0, data.length - 1);

        return data;
    }

    public save() {
        // console.log('save');

        // const pasoOneFormValue = this.pasoOneForm.value;
        const pasoTwoFormValue = this.pasoTwoForm.value;
        // const pasoThreeFormValue = this.pasoThreeForm.value;


        // const pasoOneFormValid = this.pasoOneForm.valid;
        const pasoTwoFormValid = this.pasoTwoForm.valid;
        const pasoThreeFormValid = this.pasoThreeForm.valid;

        const acceptInputFile = this.prepareDataAccept();

        // const data = Object.assign({ accept_fileinput: acceptInputFile }, pasoOneFormValue, pasoTwoFormValue);
        const data = Object.assign({ accept_fileinput: acceptInputFile }, pasoTwoFormValue);
        // console.log(data);
        // console.log(pasoOneFormValid);
        // console.log(pasoTwoFormValid);
        // console.log(pasoThreeFormValid);
        // console.log(acceptInputFile);

        // if (pasoOneFormValid && pasoTwoFormValid && pasoThreeFormValid) {
        if (pasoTwoFormValid && pasoThreeFormValid) {
            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.camposService.update$(data.id, data).subscribe(res => {
                            this.snackBar.open(MESSAGES.campo.put, MESSAGES.actions.put, snackBarDuration);
                            this.dialogRef.close();
                            this.pasoTwoForm.reset();
                            this.pasoThreeForm.reset();
                        });
                    } else {
                    }
                });
        }
    }

    public onDeleteField() {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.camposService.delete$(this.data.campoId).subscribe(res => {
                        this.snackBar.open(MESSAGES.campo.delete, MESSAGES.actions.put, snackBarDuration);
                        this.dialogRef.close();
                        this.pasoTwoForm.reset();
                        this.pasoThreeForm.reset();
                    });
                } else {
                }
            });
    }

    // public loadTipoDeCampos() {
    //     this.tiposDeCampos = [
    //         {
    //             name: 'Simples',
    //             campos: [
    //                 { value: 'input', viewValue: 'Input' },
    //                 { value: 'number', viewValue: 'Number' },
    //                 { value: 'select', viewValue: 'Select' },
    //                 { value: 'email', viewValue: 'Email' },
    //                 { value: 'tel', viewValue: 'Teléfono' },
    //                 { value: 'textarea', viewValue: 'Textarea' },
    //                 { value: 'slideToggle', viewValue: 'SlideToggle' },
    //                 { value: 'password', viewValue: 'Password' },
    //                 { value: 'radio', viewValue: 'Radio' },
    //                 { value: 'checkbox', viewValue: 'Checkbox' },
    //             ]
    //         },
    //         {
    //             name: 'Complejo',
    //             campos: [
    //                 { value: 'date', viewValue: 'Datepicker' }, /** Nos regimos al backend */
    //                 { value: 'fileinput', viewValue: 'File Input' }, /** Nos regimos al backend */
    //             ]
    //         },
    //         {
    //             name: 'Botones',
    //             campos: [
    //                 { value: 'buttonSubmit', viewValue: 'Botón submit' },
    //             ]
    //         },
    //     ];
    // }
}
