import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { AsesoresReactiveService } from '../../shared/asesores.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Persona {
  nombres: string;
}

@Component({
  selector: 'dgi-form-vincule',
  templateUrl: './form-vincule.component.html',
  styleUrls: ['./form-vincule.component.scss'],
})
export class FormVinculeComponent implements OnInit {
  public asesorVinculeForm: FormGroup;


  personas: Persona[] = [
    { nombres: 'Mary' },
    { nombres: 'Shelley' },
    { nombres: 'Igor' }
  ];

  filteredOptions: Observable<Persona[]>;

  constructor(
    private dialogRef: MatDialogRef<FormVinculeComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private asesoresReactiveService: AsesoresReactiveService,
  ) { }

  ngOnInit() {
    this.buildForm();

    this.subscribeFieldAutocomplete();
  }

  private subscribeFieldAutocomplete() {
    if (this.asesorVinculeForm) {
      this.filteredOptions = this.asesorVinculeForm.controls['persona']
        .valueChanges
        .pipe(
          startWith<string | Persona>(''),
          map(value => typeof value === 'string' ? value : value.nombres),
          map(nombres => nombres ? this._filter(nombres) : this.personas.slice()),
      );
    }
  }

  public displayFn(user?: Persona): string | undefined {
    return user ? user.nombres : undefined;
  }

  private _filter(nombres) {
    const filterValue = nombres.toLowerCase();
    return this.personas.filter(option => option.nombres.toLowerCase().indexOf(filterValue) === 0);
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.asesorVinculeForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      activo: [true, Validators.required],
      persona: ['', Validators.required]
      // persona: this.formBuilder.group({
      //   id: [''],
      //   nombres: ['', Validators.required],
      //   apellido_paterno: ['', Validators.required],
      //   apellido_materno: ['', Validators.required],
      //   num_doc: ['', Validators.required],
      //   genero: ['M', Validators.required],
      //   fecha_nacimiento: ['', Validators.required],
      // })
    };

    return controls;
  }

  // private prepareFechaNacimiento(fecha_nacimiento) {
  //   return fecha_nacimiento && fecha_nacimiento.toISOString().split('T')[0];
  // }

  public onSubmit() {
    const value = this.asesorVinculeForm.value;
    const valid = this.asesorVinculeForm.valid;
    // console.log(this.prepareFechaNacimiento(value.fecha_nacimiento));

    // value.persona.fecha_nacimiento = this.prepareFechaNacimiento(value.persona.fecha_nacimiento);

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.asesor.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.asesoresReactiveService.save(value);
            this.dialogRef.close();
            this.asesorVinculeForm.reset();
          } else {
          }
        });
    }
  }

}
