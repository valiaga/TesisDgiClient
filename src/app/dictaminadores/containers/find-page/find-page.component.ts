import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormNewComponent, FormEditComponent, FormVinculeComponent } from '../../components';
// import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { Router, ActivatedRoute } from '@angular/router';
import { DictaminadoresReactiveService } from '../../shared/dictaminadores.service';
import { Dictaminador } from '../../shared/dictaminador';

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
    public dictaminadores$: Observable<Dictaminador[]>;

    constructor(
        private dictaminadoresReactiveService: DictaminadoresReactiveService,
        private dialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.dictaminadores$ = this.dictaminadoresReactiveService.dictaminadores;
        this.getDictaminadores();
    }

    private getDictaminadores() {
        this.dictaminadoresReactiveService.getList();
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog dictaminador');
        });
    }

    public onVincule() {
        const dialogRef = this.dialog.open(FormVinculeComponent, {
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog vincule dictaminador');
        });
    }

    public onUpdateDictaminador(event) {
        // console.log('Update: ', event);
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                dictaminadorId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog dictaminador');
        });

    }
    public onDeleteDictaminador(event) {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.dictaminador.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.dictaminadoresReactiveService.delete(event);
                } else {
                }
            });
    }

    public onGetProyectos(event) {
        this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    }
}
