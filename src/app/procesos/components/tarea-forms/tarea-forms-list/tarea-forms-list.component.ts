import { Component, OnInit } from '@angular/core';
import { FormularioService } from '../../../../dynamic-form/shared/formulario.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';

@Component({
    selector: 'dgi-tarea-forms-list',
    templateUrl: 'tarea-forms-list.component.html',
})

export class TareaFormsListComponent implements OnInit {
    public formularios: any[];

    constructor(private formulariosService: FormularioService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.loadMaters();
    }

    private loadMaters() {
        this.route.params
            .pipe(
                map(params => params['tareaId'].toString()),
                mergeMap((tareaId: string) => this.formulariosService.getFormulariosByTareaId$(tareaId)))
            .subscribe(formularios => {
                this.formularios = formularios;
                console.log(formularios);
            });
    }
}
