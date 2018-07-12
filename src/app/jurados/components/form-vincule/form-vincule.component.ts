import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersonasService } from '../../../personas/shared/personas.service';
import { JuradosReactiveService } from '../../shared/jurados.service';


@Component({
  selector: 'dgi-form-vincule',
  templateUrl: './form-vincule.component.html',
  styleUrls: ['./form-vincule.component.scss'],
})
export class FormVinculeComponent implements OnInit {
  public juradosVinculeForm: FormGroup;

  public filteredOptions: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<FormVinculeComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private juradosReactiveService: JuradosReactiveService,
    private personasService: PersonasService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeFieldAutocomplete();
  }

  private subscribeFieldAutocomplete() {
    if (this.juradosVinculeForm) {
      this.filteredOptions = this.juradosVinculeForm.controls['persona']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.nombres),
          switchMap(nombres => nombres ? this.getPersonas(nombres) : [])
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
    this.juradosVinculeForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      activo: [true, Validators.required],
      persona: ['', Validators.required]
    };

    return controls;
  }

  public onSubmit() {
    const value = this.juradosVinculeForm.value;
    const valid = this.juradosVinculeForm.valid;

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.jurado.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.juradosReactiveService.save(value);
            this.dialogRef.close();
            this.juradosVinculeForm.reset();
          } else {
          }
        });
    }
  }
}
