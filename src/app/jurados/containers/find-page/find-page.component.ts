import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { JuradosReactiveService } from '../../shared/jurados.service';
import { Jurado } from '../../shared/jurado';
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
})

export class FindPageComponent implements OnInit {
    public jurados$: Observable<Jurado[]>;

    constructor(
        private juradosReactiveService: JuradosReactiveService,
        private dialog: MatDialog,
        private viewContainerRef: ViewContainerRef,
        private tdDialogService: TdDialogService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        this.jurados$ = this.juradosReactiveService.jurados;
        this.getJurados();
    }

    private getJurados() {
        this.juradosReactiveService.getList();
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog jurado');
        });
    }

    public onUpdateJurado(event) {
        // console.log('Update: ', event);
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                juradoId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog jurado');
        });

    }
    public onDeleteJurado(event) {
        this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.jurado.confirmDelete, this.viewContainerRef))
            .afterClosed().subscribe((accept: boolean) => {
                if (accept) {
                    this.juradosReactiveService.delete(event);
                } else {
                }
            });
    }

    public onGetProyectos(event) {
        this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    }
}
