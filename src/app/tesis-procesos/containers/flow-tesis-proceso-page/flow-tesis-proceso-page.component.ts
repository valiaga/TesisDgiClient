import { Component, OnInit, ViewChild, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { EtapaService } from '../../../etapas/shared/etapa.service';
import { Observable } from 'rxjs/Observable';
import { Etapa } from '../../../etapas/shared/etapa';
import { ActivatedRoute, Params } from '@angular/router';
import { MatStepper, MatStep } from '@angular/material';
import { TareaService } from '../../../tareas/shared/tarea.service';
import { Tarea } from '../../../tareas/shared/tarea';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
// import { Formulario } from '../../../dynamic-form/models/formulario';
import { FormularioService } from '../../../dynamic-form/shared/formulario.service';
// import { CampoBase } from '../../../dynamic-form/models/campo-base';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CampoService } from '../../../dynamic-form/shared/campo.service';
import { DynamicFormComponent } from '../../../dynamic-form/containers/dynamic-form.component';
import { FieldConfig } from '../../../dynamic-form/models/field-config';
import { Form } from '../../../dynamic-form/models/form';
// import { ControlService } from '../../../forms-dynamic/shared/control.service';


@Component({
  selector: 'dgi-flow-tesis-proceso-page',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container class="flow-tesis-container">
      <mat-sidenav #sidenav mode="side" opened="true" class="mat-sidenav">
        <mat-vertical-stepper #verticalStepper>
          <!-- <dgi-step-list
            [etapas]="etapas$ | async">
            </dgi-step-list> -->
            <mat-step *ngFor="let etapa of etapas$ | async" label="{{ etapa.id }}" >
              <ng-template matStepLabel>{{ etapa.nombre }}</ng-template>
              {{ etapa.descripcion }}
            </mat-step>
        </mat-vertical-stepper>
      </mat-sidenav>

      <mat-sidenav-content>
        <mat-toolbar color="primary"> <!--warn, primary, accent-->
          <!--<span>Name Project</span>-->
          <p class="name-project">
          Implementacion de una apliacion web para la gestion del
          proceso de tesis para titulo profesional en la Universidad
          Peruana Unión basado en la metodologia scrum y la ISO/IEC 29110.</p>
          <!--<p class="name-project">{{ proyecto_nombre }}</p> -->
        </mat-toolbar>

        <mat-card class="mat-card-content">
          <mat-horizontal-stepper #horizontalStepper [linear]="[true]">
            <mat-step label="{{ tarea.id }}" *ngFor="let tarea of tareas$ | async">
              <ng-template matStepLabel>{{ tarea.nombre }}</ng-template>

              <dgi-many-dynamic-form [formularios]="formularios"></dgi-many-dynamic-form>
<!--
              <mat-card *ngFor="let formulario of formularios$ | async">
                <mat-card-header>
                  <mat-card-title>{{formulario.nombre }}</mat-card-title>-->
                  <!-- <mat-card-title>{{formulario.nombre | uppecarse }}</mat-card-title> -->
                  <!-- <mat-card-subtitle>{{formulario.id}}</mat-card-subtitle>-->
                <!--</mat-card-header>
                <mat-card-content>-->
                      <!--<dgi-dynamic-form [campos]="campos"></dgi-dynamic-form>-->
                    <!--  <dgi-dynamic-form
                        [config]="config"
                        #form = "dgiDynamicForm"
                        (submit)="submit($event)"
                      ></dgi-dynamic-form>
                      {{ form.valid }}
                      {{ form.value | json }}-->
                      <!--<dynamic-form [config]="config"></dynamic-form>-->
                <!--</mat-card-content>
              </mat-card>-->

              <div>
                <button mat-button matStepperPrevious>Back</button>
                <button mat-button matStepperNext>Next</button>
              </div>
            </mat-step>
          </mat-horizontal-stepper>
        <!--flow-buttons-footer-->
        </mat-card>
        <dgi-flow-buttons-footer [verticalStepper]="verticalStepper" ></dgi-flow-buttons-footer>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./flow-tesis-proceso-page.component.scss'],
  providers: [
    // EtapaService,
    // TareaService,
    CampoService,
  ]
})
export class FlowTesisProcesoPageComponent implements OnInit, AfterViewInit {
  private etapas$: Observable<Etapa[]>;
  private tareas$: Observable<Tarea[]>;
  // private formularios$: Observable<Formulario[]>;
  private formularios$: Observable<any[]>;

  private campos: any[];

  // private campos: CampoBase<any>[] = [];
  // private form: FormGroup;
  // @ViewChild(DynamicFormComponent) form: DynamicFormComponent;


  @ViewChild('verticalStepper') private verticalStepper: MatStepper;
  @ViewChild('horizontalStepper') private horizontalStepper: MatStepper;

  // https://stackoverflow.com/questions/46469233/can-i-programatically-move-the-steps-of-a-mat-horizontal-stepper-in-angular-an
  // https://stackblitz.com/edit/angular-material2-beta-ybbnhe?file=theme.scss

  constructor(
    private etapaService: EtapaService,
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private formularioService: FormularioService,
    private formBuilder: FormBuilder,
    private campoService: CampoService) { }

  ngOnInit() {
    this.etapas$ = this.etapaService.etapas;
    this.tareas$ = this.tareaService.tareas;
    this.formularios$ = this.formularioService.formularios;

    this.campos = this.campoService.getCampos();

    this.onSubscribeVerticalStepper();
    this.onSubscribeHorizontalStepper();

    // this.form = this.controlService.toFormGroup(this.campos);

    this.route.params.subscribe(params => {
      const TesisProcesoId = params['id'];
      if (TesisProcesoId) {
        this.initEtapasByProcesoId(TesisProcesoId);
      } else {
        console.log('No hay id de la tesis.');
      }
    });

  }

  initEtapasByProcesoId(TesisProcesoId: string) {
    console.log('TesisProcesoId');
    console.log(TesisProcesoId);
    /** Traer Etapas */
    this.etapaService.getEtapasByTesisProcesoId(TesisProcesoId);
    setTimeout(() => {
      /** Traer Tareas de la etapa seleccionada */
      this.initGetTareas();
    }, 1500);
  }

  initGetTareas() {
    // let selectedIndex = this.verticalStepper.selectedIndex
    const etapaId = this.verticalStepper.selected.label;
    this.tareaService.getTareasByEtapaId(etapaId);

    setTimeout(() => {
      const tareaId = this.horizontalStepper.selected.label;
      this.formularioService.getFormulariosByTareaId(tareaId);
    }, 1000);
    // let selectedIndex = this.verticalStepper.selectedIndex
  }

  onSubscribeVerticalStepper() {
    this.verticalStepper.selectionChange.asObservable()
      .subscribe((stepper: StepperSelectionEvent) => {
        const etapaId = stepper.selectedStep.label;
        this.tareaService.getTareasByEtapaId(etapaId);
      });
  }

  onSubscribeHorizontalStepper() {
    this.horizontalStepper.selectionChange.asObservable()
      .subscribe((stepper: StepperSelectionEvent) => {
        const tareaId = stepper.selectedStep.label;
        this.formularioService.getFormulariosByTareaId(tareaId);
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

  public formularios: Form[] = [
    {
      name: 'Mi primer formulario',
      width: 33;
      fieldConfigs: [
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
      name: 'Mi Segundo formulario',
      width: 33,
      fieldConfigs: [
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
      name: 'Mi tercer formulario',
      width: 33;
      fieldConfigs: [
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
      disabled: false,
      // directionVertical: false,

      required: true,
      validation: [Validators.required],
    },
    // {
    // type: 'password',
    // label: 'Password',
    // name: 'password',
    // placeholder: 'Password',
    // width: 50,
    // required: true,
    // validation: [ Validators.required ],
    // },
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
  ];
}
