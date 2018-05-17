import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { FormularioService } from '../../../../dynamic-form/shared/formulario.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map, tap } from 'rxjs/operators';
import { FormToolsService } from '../../../../shared/form-tools.service';
import { MatDialog } from '@angular/material';
import { FormNewComponent } from '../form-new/form-new.component';

@Component({
    selector: 'dgi-tarea-forms-list',
    templateUrl: 'tarea-forms-list.component.html',
    styleUrls: ['tarea-forms-list.component.scss'],
})

export class TareaFormsListComponent implements OnInit, AfterViewChecked {
    public formularios: any[];
    public tareaId: string;

    constructor(private formulariosService: FormularioService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private formToolsService: FormToolsService,
        private changeDetector: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        this.loadMaters();
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
    }

    private loadMaters() {
        this.route.params
            .pipe(
                map(params => params['tareaId'].toString()),
                mergeMap((tareaId: string) => {
                    this.tareaId = tareaId;
                    return this.formulariosService.getFormulariosByTareaId$(tareaId);
                }))
            .subscribe(formularios => {
                // setTimeout(() => {
                this.formularios = formularios;
                console.log(formularios);
                // }, 0);
            });
    }

    public getFormClass(formulario: any) {
        return this.formToolsService.getFormClass(formulario);
    }

    public newFormulario() {

        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
            data: { tareaId: this.tareaId },
        });
        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog escuela');
        });
    }
}
