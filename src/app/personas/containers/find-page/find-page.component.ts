import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PersonasReactiveService } from '../../shared/personas.service';
import { Persona } from '../../shared/persona';
import { MatDialog } from '@angular/material';
import { FormNewComponent, FormEditComponent } from '../../components';
// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
    styles: [`
        .button-fab{
            position: absolute;
            right: 90px;
            bottom: 20px
        }
    `],
})

export class FindPageComponent implements OnInit {
    public personas$: Observable<Persona[]>;

    constructor(
        private personasReactiveService: PersonasReactiveService,
        private dialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.personas$ = this.personasReactiveService.personas;
        this.getPersonas();
    }

    private getPersonas() {
        this.personasReactiveService.getList();
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog persona');
        });
    }

    public onUpdatePersona(event) {
        // console.log('Update: ', event);
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                personaId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog persona');
        });

    }
    public onDeletePersona(event) {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.asesor.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.personasReactiveService.delete(event);
                } else {
                }
            });
    }

    public onGetProyectos(event) {
        this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    }
}
