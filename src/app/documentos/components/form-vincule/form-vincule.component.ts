import { Component, OnInit, ViewContainerRef } from '@angular/core';
// import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersonasService } from '../../../personas/shared/personas.service';
// import { DictaminadoresReactiveService } from '../../shared/dictaminadores.service';
// import { TesistasService } from '../../shared/tesistas.service';

@Component({
  selector: 'dgi-form-vincule',
  templateUrl: './form-vincule.component.html',
  styleUrls: ['./form-vincule.component.scss'],
})
export class FormVinculeComponent implements OnInit {
  public tesistaVinculeForm: FormGroup;
  public filteredOptions: Observable<any[]>;

  constructor(
    // private dialogRef: MatDialogRef<FormVinculeComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    // private tesistaService: TesistasService,
    private personasService: PersonasService,
    // private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeFieldAutocomplete();
  }

  private subscribeFieldAutocomplete() {
    if (this.tesistaVinculeForm) {
      this.filteredOptions = this.tesistaVinculeForm.controls['persona']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value && value.nombres || null),
          switchMap(nombres => nombres ? this.getPersonas(nombres) : []),
        );
    }
  }

  private getPersonas(query) {
    const params = { query: query, fields: 'nombres,apellido_paterno,apellido_materno' };
    return this.personasService.getList$(params);
  }

  public displayFn(user?: any): string | undefined {
    return user ? `${user.nombres} ${user.apellido_paterno} ${user.apellido_materno}` : undefined;
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.tesistaVinculeForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      activo: [true, Validators.required],
      persona: ['', Validators.required],
    };

    return controls;
  }

  public onSubmit() {
    // const value = this.tesistaVinculeForm.value;
    const valid = this.tesistaVinculeForm.valid;

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.dictaminador.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            // this.tesistaService.add$(value).subscribe(tesista => {
            // this.snackBar.open(MESSAGES.tesista.post, MESSAGES.actions.post, snackBarDuration);
            // this.dialogRef.close(true);
            // this.tesistaVinculeForm.reset();
            // });
          } else {
          }
        });
    }
  }
}
