import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DocumentosService } from '../../../../documentos/shared/documentos.service';
import { CamposService } from '../../../../campos/shared/campos.service';
import { map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
    selector: 'dgi-generador-documentos-new',
    templateUrl: 'generador-documentos-new.component.html',
    styleUrls: ['generador-documentos-new.component.scss'],
})

export class GeneradorDocumentosNewComponent implements OnInit {
    public documentos: any[];
    public campos: any[];

    public generadorDocForm: FormGroup;
    public camposCheckeds: any[] = [];

    constructor(private dialogRef: MatDialogRef<GeneradorDocumentosNewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private camposService: CamposService,
        private formBuilder: FormBuilder,
        private tdDialogService: TdDialogService,
        private snackBar: MatSnackBar,
        private viewContainerRef: ViewContainerRef,
        private documentosService: DocumentosService) { }

    ngOnInit() {
        this.loadMaestros();
        this.buildForm();
    }

    private buildForm() {
        const controls = this.initializeControls();
        this.generadorDocForm = this.formBuilder.group(controls);
    }

    private initializeControls() {
        const controls = {
            label: ['', [Validators.required]],
            name: ['', [Validators.required]],
            // icon: ['', [Validators.required]],
            icon: [''],
            hint_start: [''],
            width: ['100', Validators.required],
            formulario: [this.data.formulario.id, [Validators.required]],
            order: ['', [Validators.required]],
            documento: ['', Validators.required],
            campos_validados: [],
        };
        return controls;
    }

    private loadMaestros() {
        this.documentosService.getWithQuery$({})
            .pipe(map(response => response.results))
            .subscribe(this.loadDocumentos.bind(this));
        const formulario = this.data.formulario.id;
        // console.log(this.data.formulario.id);
        this.camposService.getWithQuery$({ formulario: formulario }).subscribe(this.loadCampos.bind(this));
    }

    private loadDocumentos(response) {
        this.documentos = response;
    }
    private loadCampos(response) {

        this.campos = response.map(res => {
            res.checked = false;
            return res;
        });
    }

    public onChangeCheckedCampo(event, id) {
        if (event.checked) {
            this.camposCheckeds.push(id);
        } else {
            const indexx = this.camposCheckeds.indexOf(id);
            this.camposCheckeds.splice(indexx, 1);
        }
    }

    public onSubmit() {
        const value = this.generadorDocForm.value;
        const valid = this.generadorDocForm.valid;

        value.name = (value.name).toLowerCase().replace(' ', '');
        value.campos_validados = this.camposCheckeds.join(',');
        value.type = 'generar_documentos';

        if (valid) {
            // console.log(value);
            // console.log(this.camposCheckeds);

            this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.campo.confirmCreate, this.viewContainerRef))
                .afterClosed().subscribe((accept: boolean) => {
                    if (accept) {
                        this.camposService.add$(value).subscribe(response => {
                            this.snackBar.open(MESSAGES.campo.post, MESSAGES.actions.post, snackBarDuration);
                            this.dialogRef.close(this.data.formulario.tarea);
                            this.generadorDocForm.reset();
                        });
                    } else {
                    }
                });
        }
    }
}
