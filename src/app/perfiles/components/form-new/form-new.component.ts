import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';
import { PerfilesService } from '../../shared/perfiles.service';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { PersonasService } from '../../../personas/shared/personas.service';
import { UsersService } from '../../../users/shared/users.service';

@Component({
  selector: 'dgi-form-new',
  templateUrl: './form-new.component.html',
  styleUrls: ['./form-new.component.scss'],
})
export class FormNewComponent implements OnInit {
  public perfilForm: FormGroup;

  public filteredPersonas: Observable<any[]>;
  public filteredUsuarios: Observable<any[]>;

  constructor(
    private dialogRef: MatDialogRef<FormNewComponent>,
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private tdDialogService: TdDialogService,
    private perfilesService: PerfilesService,
    private personasService: PersonasService,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.subscribePersonaAutocomplete();
    this.subscribeUsuarioAutocomplete();
  }

  private subscribePersonaAutocomplete() {
    if (this.perfilForm) {
      console.log('hola>>>');

      this.filteredPersonas = this.perfilForm.controls['persona']
      // this.perfilForm.controls['persona']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.nombres),
          switchMap(nombres => {
            console.log('nombres');
            console.log(nombres);
            return nombres ? this.getPersonas(nombres) : [];
          }),
      );
    }
  }

  private getPersonas(query) {
    console.log('si');
    const params = { query: query, fields: 'nombres,apellido_paterno,apellido_materno' };
    return this.personasService.getList$(params);
  }


  public displayFnPersonas(persona?: any): string | undefined {
    return persona ? `${persona.nombres} ${persona.apellido_paterno} ${persona.apellido_materno}` : undefined;
  }

  private subscribeUsuarioAutocomplete() {
    if (this.perfilForm) {
      this.filteredPersonas = this.perfilForm.controls['usuario']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value.username),
          switchMap(username => username ? this.getUsuarios(username) : [])
        );
    }
  }

  private getUsuarios(query) {
    const params = { query: query, fields: 'username,email' };
    return this.userService.getList$(params);
  }

  public displayFnUsuarios(user?: any): string | undefined {
    return user ? `${user.username} ${user.email}` : undefined;
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.perfilForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      id: [''],
      usuario: ['', [Validators.required]],
      persona: ['', [Validators.required]]
    };

    return controls;
  }

  public onSubmit() {
    const value = this.perfilForm.value;
    const valid = this.perfilForm.valid;

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.perfil.confirmCreate, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            this.perfilesService.save$(value).subscribe();
            this.dialogRef.close();
            this.perfilForm.reset();
          } else {
          }
        });
    }
  }

}
