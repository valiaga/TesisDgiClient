import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { FormNewComponent, FormEditComponent } from '../../components';
import { MESSAGES } from 'config/messages';
import { snackBarDuration } from 'config/general';
import { TesistasService } from '../../shared/tesistas.service';
import { ITesista } from '../../shared/tesista';
import { FormVinculeComponent } from '../../components';

@Component({
    selector: 'dgi-find-page',
    templateUrl: 'find-page.component.html',
    styleUrls: ['find-page.component.scss'],
})

export class FindPageComponent implements OnInit {
    public tesistas: ITesista[];

    constructor(
        private tesistasService: TesistasService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar,

        // private viewContainerRef: ViewContainerRef,
        // private tdDialogService: TdDialogService,
        // private router: Router,
        // private route: ActivatedRoute,
    ) { }

    ngOnInit() {

        // this.jurados$ = this.juradosReactiveService.jurados;
        this.getTesistas();
    }

    private getTesistas() {
        const loadTesistas = this.loadTesistas.bind(this);
        this.tesistasService.getWithQuery$({})
            .pipe(map(response => response.results))
            .subscribe(loadTesistas);
    }

    private loadTesistas(response) {
        this.snackBar.open(MESSAGES.tesista.getMany, MESSAGES.actions.get, snackBarDuration);
        this.tesistas = response;
    }

    public openDialog() {
        const dialogRef = this.dialog.open(FormNewComponent, {
            width: '500px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getTesistas();
            }
        });
    }

    public onDelete(event: string[]) {
        event.forEach(tesistaId => {
            this.tesistasService.delete$(tesistaId).subscribe(response => {
                this.snackBar.open(MESSAGES.tesista.deleteAll, MESSAGES.actions.delete, snackBarDuration);
                this.getTesistas();
            });
        });
    }

    public onUpdateTesista(event) {
        // console.log('Update: ', event);
        const dialogRef = this.dialog.open(FormEditComponent, {
            width: '500px',
            data: {
                tesistaId: event,
            },
        });

        dialogRef.afterClosed().subscribe(result => {
            // console.log('close dialog tesista');
            if (result) {
                this.getTesistas();
            }
        });
    }

    public onVincule() {
        const dialogRef = this.dialog.open(FormVinculeComponent, {
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.getTesistas();
            }
            // console.log('close dialog vincule tesista');
        });
    }

    // public onGetProyectos(event) {
    //     this.router.navigate(['./', event, 'proyectos'], { relativeTo: this.route });
    // }
}
