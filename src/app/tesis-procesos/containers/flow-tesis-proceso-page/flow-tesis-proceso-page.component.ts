import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { EtapaService } from '../../../etapas/shared/etapa.service';
import { Observable } from 'rxjs/Observable';
import { Etapa } from '../../../etapas/shared/etapa';
import { ActivatedRoute, Params } from '@angular/router';
import { MatStepper, MatStep } from '@angular/material';
import { TareaService } from '../../../tareas/shared/tarea.service';
import { Tarea } from '../../../tareas/shared/tarea';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Formulario } from '../../../forms-dynamic/models/formulario';
import { FormularioService } from '../../../forms-dynamic/shared/formulario.service';
import { CampoBase } from '../../../forms-dynamic/models/campo-base';
import { FormGroup } from '@angular/forms/src/model';
import { CampoService } from '../../../forms-dynamic/shared/campo.service';
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
          <p class="name-project">Implementacion de una apliacion web para la gestion del proceso de tesis para titulo profesional en la Universidad Peruana Unión basado en la metodologia scrum y la ISO/IEC 29110.</p>
          <!--<p class="name-project">{{ proyecto_nombre }}</p> -->
        </mat-toolbar>

        <mat-card class="mat-card-content">
          <mat-horizontal-stepper #horizontalStepper [linear]="[true]">
            <mat-step label="{{ tarea.id }}" *ngFor="let tarea of tareas$ | async">
              <ng-template matStepLabel>{{ tarea.nombre }}</ng-template>


              <mat-card *ngFor="let formulario of formularios$ | async">
                <mat-card-header>
                  <mat-card-title>{{formulario.nombre }}</mat-card-title>
                  <!-- <mat-card-title>{{formulario.nombre | uppecarse }}</mat-card-title> -->
                  <!-- <mat-card-subtitle>{{formulario.id}}</mat-card-subtitle>-->
                </mat-card-header> 
                <mat-card-content>
                      <dgi-dynamic-form [campos]="campos"></dgi-dynamic-form>
                </mat-card-content>
              </mat-card>

                  <!-- Nombre field -->
                  <div class="flow-tesis-proceso-container">
                    <mat-form-field
                    [hideRequiredMarker]="[false]"
                    [floatLabel]="['auto']">
                    <input matInput placeholder="Nombre" required>
                    <!-- <input matInput placeholder="Nombre" formControlName="nombre" required>-->
                    <!-- <mat-error *ngIf="!nombre.invalid">Error</mat-error> -->
                    </mat-form-field>
                    
                    <!-- Email field -->
                    <mat-form-field
                      [floatLabel]="['auto']">
                      <!-- <input matInput placeholder="Alias" formControlName="alias"> -->
                      <input matInput type="email" placeholder="Email" >
                    </mat-form-field>

                    <!-- Activo field -->
                    <div class="checkbox">
                      <mat-checkbox>Activo</mat-checkbox>
                    </div>
                
                    <!-- Misión field -->
                    <mat-form-field
                      [floatLabel]="['auto']">
                      <textarea matInput placeholder="Misión" matTextareaAutosize 
                        matAutosizeMaxRows="5"
                        matAutosizeMinRows="2"></textarea>
                    </mat-form-field>
                
                    <!-- Seleccionar field -->      
                    <mat-form-field
                      [hideRequiredMarker]="[false]">
                      <mat-select placeholder="Seleccionar" required>
                        <mat-option value="1" selected>-1-</mat-option>
                        <mat-option value="2" selected>-2-</mat-option>
                      </mat-select>
                    </mat-form-field>

                  </div>
                  




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
export class FlowTesisProcesoPageComponent implements OnInit {
  private etapas$: Observable<Etapa[]>;
  private tareas$: Observable<Tarea[]>;
  private formularios$: Observable<Formulario[]>;
  
  private campos: any[];

  // private campos: CampoBase<any>[] = [];
  // private form: FormGroup;

  
  @ViewChild('verticalStepper') private verticalStepper: MatStepper;
  @ViewChild('horizontalStepper') private horizontalStepper: MatStepper;
  
  // https://stackoverflow.com/questions/46469233/can-i-programatically-move-the-steps-of-a-mat-horizontal-stepper-in-angular-an
  // https://stackblitz.com/edit/angular-material2-beta-ybbnhe?file=theme.scss

  constructor(
    private etapaService: EtapaService, 
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private formularioService: FormularioService,
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
      let TesisProcesoId = params['id'];
      if(TesisProcesoId) {
        this.initEtapasByProcesoId(TesisProcesoId);
      } else {
        console.log('No hay id de la tesis.')
      }
    });
  }
  
  initEtapasByProcesoId(TesisProcesoId: string) {
    console.log('TesisProcesoId');
    console.log(TesisProcesoId);
    /** Traer Etapas */
    this.etapaService.getEtapasByTesisProcesoId(TesisProcesoId);
    setTimeout(()=>{
      /** Traer Tareas de la etapa seleccionada */
      this.initGetTareas();
    }, 1500)
  }

  initGetTareas() {
    // let selectedIndex = this.verticalStepper.selectedIndex
    let etapa_id = this.verticalStepper.selected.label;
    this.tareaService.getTareasByEtapaId(etapa_id);

    setTimeout(()=>{
      let tarea_id = this.horizontalStepper.selected.label;
      this.formularioService.getFormulariosByTareaId(tarea_id);
    }, 1000)
    // let selectedIndex = this.verticalStepper.selectedIndex
    
  }

  onSubscribeVerticalStepper() {
    this.verticalStepper.selectionChange.asObservable()
        .subscribe((stepper: StepperSelectionEvent) => {
          let etapa_id = stepper.selectedStep.label;
          this.tareaService.getTareasByEtapaId(etapa_id);
        });
  }

  onSubscribeHorizontalStepper() {
    this.horizontalStepper.selectionChange.asObservable()
        .subscribe((stepper: StepperSelectionEvent) => {
          let tarea_id = stepper.selectedStep.label;
          this.formularioService.getFormulariosByTareaId(tarea_id);
        });
    
  }
}
