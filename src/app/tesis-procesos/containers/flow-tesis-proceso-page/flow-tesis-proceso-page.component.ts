import { Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { EtapaService, EtapaReactiveService } from '../../../etapas/shared/etapa.service';
import { Observable } from 'rxjs';
import { Etapa } from '../../../etapas/shared/etapa';
import { ActivatedRoute, Params } from '@angular/router';
import { MatStepper, MatStep } from '@angular/material';
import { TareaService } from '../../../tareas/shared/tarea.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CampoService } from '../../../dynamic-form/shared/campo.service';
import { DynamicFormComponent } from '../../../dynamic-form/containers/dynamic-form.component';
import { FieldConfig } from '../../../dynamic-form/models/field-config';
import { Form } from '../../../dynamic-form/models/form';
import { IFormulario } from '../../../dynamic-form/models.1/formulario';
import { Validation } from '../../../dynamic-form/models/validation';
import { ValidatorFn, Validator } from '@angular/forms/src/directives/validators';
import { Tarea } from '../../../tareas/models/tarea';


@Component({
  selector: 'dgi-flow-tesis-proceso-page',
  templateUrl: 'flow-tesis-proceso-page.component.html',
  styleUrls: ['./flow-tesis-proceso-page.component.scss'],
  providers: [
    CampoService,
  ]
})
export class FlowTesisProcesoPageComponent implements OnInit, AfterViewInit {
  private etapas: Etapa[];
  private tareas: Tarea[];
  private formularios: Form[];

  private campos: any[];

  @ViewChild('sidenavEtapas') private sidenavEtapas: MatStepper;
  @ViewChild('tareasStepper') private tareasStepper: MatStepper;

  // https://stackoverflow.com/questions/46469233/can-i-programatically-move-the-steps-of-a-mat-horizontal-stepper-in-angular-an
  // https://stackblitz.com/edit/angular-material2-beta-ybbnhe?file=theme.scss

  constructor(
    private etapaService: EtapaService,
    private etapaReactiveService: EtapaReactiveService,
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private formBuilder: FormBuilder,
    private campoService: CampoService) { }

  ngOnInit() {

    this.onSubscribeSidenavEtapas();
    this.onSubscribeTareasStepper();

    this.route.params.subscribe(params => {
      const TesisProcesoId = params['id'];
      if (TesisProcesoId) {
        this.initEtapasByProcesoId(TesisProcesoId);
      } else {
        console.warn('No hay id de la tesis.');
      }
    });
  }

  public initEtapasByProcesoId(TesisProcesoId: string) {
    this.etapaService.getEtapasByTesisProcesoId(TesisProcesoId)
      .subscribe(this.loadEtapasByTesisProcesoId.bind(this));
  }

  private loadEtapasByTesisProcesoId(etapas) {
    this.etapas = etapas;
    this.initGetTareasByEtapaId(etapas[0].id);
  }

  public initGetTareasByEtapaId(etapaId: string) {
    this.tareaService.getTareasByEtapaId(etapaId)
      .subscribe(this.loadTareasByEtapaId.bind(this));
  }

  private loadTareasByEtapaId(tareas) {
    this.tareas = tareas;
    this.initGetFormulariosByTareaId(tareas[0].id);
  }

  public initGetFormulariosByTareaId(tareaIdSelect: string) {
    this.tareaService.getFomulariosByTareaId$(tareaIdSelect)
      .subscribe(this.loadFormulariosByTareaId.bind(this));
  }

  private loadFormulariosByTareaId(formularios) {
    this.formularios = this.transformJsonForm(formularios);
  }

  private getValidatorFn(validation: Validation): ValidatorFn {

    let validator: ValidatorFn;
    switch (validation.validation) {
      case 'required':
        validator = Validators.required;
        break;
      case 'email':
        validator = Validators.email;
        break;
    }

    return validator;
  }

  private getListValidatorFn(validations: Validation[]): ValidatorFn[] {
    if (!validations.length) {
      return;
    }
    const validationsFn: ValidatorFn[] = validations.map(validation => this.getValidatorFn(validation));
    return validationsFn;
  }

  private transformJsonForm(formularios: any[]) {
    const Iformularios: Form[] = [];

    formularios.forEach(form => {
      const ICampos: FieldConfig[] = [];
      form.campos.forEach(campo => {
        campo.validation = this.getListValidatorFn(campo.campovalidation_set);
        ICampos.push(campo);
      });
      Iformularios.push(form);
    });
    return Iformularios;
  }

  public onSubscribeSidenavEtapas() {
    this.sidenavEtapas.selectionChange.asObservable()
      .subscribe((stepper: StepperSelectionEvent) => {
        const etapaId = stepper.selectedStep.label;
        this.initGetTareasByEtapaId(etapaId);
      });
  }

  public onSubscribeTareasStepper() {
    this.tareasStepper.selectionChange.asObservable()
      .subscribe((stepper: StepperSelectionEvent) => {
        const tareaId = stepper.selectedStep.label;
        this.initGetFormulariosByTareaId(tareaId);
        // this.formularioService.getFormulariosByTareaId(tareaId);
      });
  }


  ngAfterViewInit() {
    // setTimeout(() => {

    //   let previousValid = this.form.valid;
    //   this.form.changes.subscribe(() => {
    //     if (this.form.valid !== previousValid) {
    //       previousValid = this.form.valid;
    //       this.form.setDisabled('submit', !previousValid);
    //     }
    //   });

    //   this.form.setDisabled('submit', true);
    //   // this.form.setValue('name', 'Vitmar Aliaga');
    //   // this.form.setValue('edad', '15');
    //   // this.formTest = controls;
    // }, 10000);

  }

  // submit(value: { [name: string]: any }) {
  // console.log('value');
  // console.log(value);
  // }

  /*
  public formularioss: any[] = [
    {
      nombre: 'Mi primer formulario',
      width: 33,
      campos: [
        {
          type: 'input',
          label: 'Nombres',
          name: 'nombres',
          placeholder: 'Nombres',
          width: 100,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Paterno',
          name: 'ap_paterno',
          placeholder: 'Apellido Paterno',
          width: 50,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Materno',
          name: 'ap_materno',
          placeholder: 'Apellido Materno',
          width: 50,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'datepicker',
          label: 'Fecha de Nacimiento',
          name: 'fech_nac',
          placeholder: 'Fecha de Nacimiento',
          width: 50,
          // required: true,
          // validation: [ Validators.required ],
        },
        {
          label: 'Guardar',
          name: 'submit',
          type: 'buttonSubmit'
        },
      ],
    },
    {
      nombre: 'Mi Segundo formulario',
      width: 33,
      campos: [
        {
          type: 'input',
          label: 'Nombres',
          name: 'nombres',
          placeholder: 'Nombres',
          width: 100,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Paterno',
          name: 'ap_paterno',
          placeholder: 'Apellido Paterno',
          width: 100,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Materno',
          name: 'ap_materno',
          placeholder: 'Apellido Materno',
          width: 100,
          required: true,
          validation: [Validators.required]
        },
        {
          label: 'Guardar',
          name: 'submit',
          type: 'buttonSubmit'
        },
      ],
    },
    {
      nombre: 'Mi tercer formulario',
      width: 33,
      campos: [
        {
          type: 'input',
          label: 'Nombres',
          name: 'nombres',
          placeholder: 'Nombres',
          width: 100,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Paterno',
          name: 'ap_paterno',
          placeholder: 'Apellido Paterno',
          width: 50,
          required: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Apellido Materno',
          name: 'ap_materno',
          placeholder: 'Apellido Materno',
          width: 50,
          required: true,
          validation: [Validators.required]
        },
        {
          label: 'Guardar',
          name: 'submit',
          type: 'buttonSubmit'
        },
      ],
    },
  ];
  */

  /*
  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Nombres',
      name: 'nombres',
      placeholder: 'Nombres',
      width: 50,
      required: true,
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Apellido Paterno',
      name: 'ap_paterno',
      placeholder: 'Apellido Paterno',
      width: 25,
      required: true,
      validation: [Validators.required]
    },
    {
      type: 'input',
      label: 'Apellido Materno',
      name: 'ap_materno',
      placeholder: 'Apellido Materno',
      width: 25,
      required: true,
      validation: [Validators.required]
    },
    {
      type: 'tel',
      label: 'Celular',
      name: 'celular',
      placeholder: 'Celular',
      width: 50,
      required: false,
      validation: []
    },
    /*
    {
      type: 'input',
      label: 'Fecha de Nacimiento',
      name: 'fech_nac',
      placeholder: 'Fecha de Nacimiento',
      width: 50,
      required: false,
      validation: []
    },*/
  /*
  {
    type: 'select',
    label: 'Favourite Food',
    name: 'food',
    options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
    placeholder: 'Select an option',
    width: 50,
    required: true,
    validation: [Validators.required],
  },
  {
    type: 'textarea',
    label: 'Descripción',
    name: 'descripcion',
    // options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
    placeholder: 'Descripción',
    width: 50,
    required: true,
    validation: [Validators.required],
  },
  {
    type: 'slideToggle',
    label: 'Activo',
    name: 'activo',
    disabled: false,
    // value: true, /** Solo fue prueva y funciono jejej. */
  // options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
  /*
  placeholder: 'Activo',
  width: 50,
  required: true,
  validation: [Validators.requiredTrue],
},
{
  type: 'radio',
  label: 'Sexo',
  name: 'sexo',
  options: [
    { id: 'M', label: 'Masculino', },
    { id: 'F', label: 'Femenino', },
  ],
  placeholder: 'Sexo',
  width: 50,
  directionVertical: false,
  required: true,
  validation: [Validators.required],
},
{
  type: 'checkbox',
  label: 'Es Alumno?',
  name: 'es_alumno',
  placeholder: 'Es Alumno?',
  width: 50,
  align: 'start', /** start/ end */
  // disabled: false,
  // directionVertical: false,

  // required: true,
  // validation: [Validators.required],
  // },
  // {
  // type: 'password',
  // label: 'Password',
  // name: 'password',
  // placeholder: 'Password',
  // width: 50,
  // required: true,
  // validation: [ Validators.required ],
  // },
  /*
  {
    type: 'datepicker',
    label: 'Fecha de Nacimiento',
    name: 'fech_nac',
    placeholder: 'Fecha de Nacimiento',
    width: 50,
    // required: true,
    // validation: [ Validators.required ],
  },
  {
    type: 'datepicker',
    label: 'Fecha Inicio de proyecto',
    name: 'fech_ini_proyecto',
    placeholder: 'Fecha Inicio de proyecto',
    width: 50,
    required: true,
    validation: [Validators.required],
  },
  {
    label: 'Guardar',
    name: 'submit',
    type: 'buttonSubmit'
  }
];*/
}
