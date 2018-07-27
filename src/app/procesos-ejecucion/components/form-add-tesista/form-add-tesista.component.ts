import { Component, OnInit, ViewContainerRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm, snackBarDuration } from 'config/general';
import { MESSAGES } from 'config/messages';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ProyectosService } from '../../../proyectos/shared/proyectos.service';
import { TesistasService } from '../../../tesistas/shared/tesistas.service';

@Component({
  selector: 'dgi-form-add-tesista',
  templateUrl: './form-add-tesista.component.html',
  styleUrls: ['./form-add-tesista.component.scss']
})
export class FormAddTesistaComponent implements OnInit {
  public addTesistaForm: FormGroup;
  public filteredOptions: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<FormAddTesistaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
    private proyectosService: ProyectosService,
    private snackBar: MatSnackBar,
    private tesistasService: TesistasService) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeFieldAutocomplete();

  }

  private subscribeFieldAutocomplete() {
    if (this.addTesistaForm) {
      this.filteredOptions = this.addTesistaForm.controls['tesista']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value && value.nombres || null),
          switchMap(nombres => nombres ? this.getTesistas(nombres) : [])
        );
    }
  }

  private getTesistas(query) {
    const params = { query: query, fields: 'persona__nombres,persona__apellido_paterno,persona__apellido_materno' };
    return this.tesistasService.getWithQuery$(params).pipe(map(response => response.results));
  }

  public displayFn(tesista?: any): string | undefined {
    return tesista ?
      `${tesista.data_persona.nombres} ${tesista.data_persona.apellido_paterno} ${tesista.data_persona.apellido_materno}` : undefined;
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.addTesistaForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      tesista: ['', [Validators.required]],
    };
    return controls;
  }

  public onSubmit() {
    const valid = this.addTesistaForm.valid;
    const value = this.addTesistaForm.value;

    if (valid) {
      const { tesista, ...rest } = this.data.proyecto;
      const data = { ...rest, tesista: [...tesista, value.tesista.id] };

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesisProceso.confirmAddTesista, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            console.log(data);
            this.proyectosService.update$(data.id, data).subscribe(response => {
              this.snackBar.open(MESSAGES.tesista.post, MESSAGES.actions.post, snackBarDuration);
              this.dialogRef.close(true);
              this.addTesistaForm.reset();
            });
            // this.tesistaService.add$(value).subscribe(tesista => {
            // });
          } else {
          }
        });

    }
  }
}
