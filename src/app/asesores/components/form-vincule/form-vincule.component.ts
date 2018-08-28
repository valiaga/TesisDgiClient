import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { AsesoresReactiveService } from '../../shared/asesores.service';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PersonasService } from '../../../personas/shared/personas.service';

// export interface Persona {
//   nombres: string;
// }

@Component({
  selector: 'dgi-form-vincule',
  templateUrl: './form-vincule.component.html',
  styleUrls: ['./form-vincule.component.scss'],
})
export class FormVinculeComponent implements OnInit {
  public asesorVinculeForm: FormGroup;


  // personas: Persona[] = [
  //   { nombres: 'Mary' },
  //   { nombres: 'Shelley' },
  //   { nombres: 'Igor' }
  // ];

  filteredOptions: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<FormVinculeComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private asesoresReactiveService: AsesoresReactiveService,
    private personasService: PersonasService,
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
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.nombres),
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
    this.asesorVinculeForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      activo: [true, Validators.required],
      persona: ['', Validators.required],
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
    // console.log(value);


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
