import { Component, OnInit, ViewChild } from '@angular/core';
import { EtapaService } from '../../../etapas/shared/etapa.service';
import { Observable } from 'rxjs/Observable';
import { Etapa } from '../../../etapas/shared/etapa';
import { ActivatedRoute, Params } from '@angular/router';
import { MatStepper, MatStep } from '@angular/material';
import { TareaService } from '../../../tareas/shared/tarea.service';
import { Tarea } from '../../../tareas/shared/tarea';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

@Component({
  selector: 'dgi-flow-tesis-proceso-page',
  template: `
  <mat-sidenav-container class="flow-tesis-container">


    <mat-sidenav #sidenav mode="side" opened="true" class="mat-sidenav">
      <mat-vertical-stepper #verticalStepper>
        <mat-step 
          *ngFor="let etapa of etapas$ | async"  
          label="{{ etapa.id }}"
          (click)="onChangeEtapa(etapa.id)"
          >
          <!-- label="{{etapa.nombre}}"
          [icon]="icon" -->
          <ng-template matStepLabel>{{ etapa.nombre }}</ng-template>
          <!-- (click)="onChangeEtapa(etapa.id)" -->
          {{ etapa.descripcion }} 
        </mat-step>
      </mat-vertical-stepper>
    </mat-sidenav>

    <mat-sidenav-content>
      <mat-card class="mat-card-content">
        <mat-horizontal-stepper [linear]="[true]">
          <mat-step label="tarea 1" *ngFor="let tarea of tareas$ | async">
            <ng-template matStepLabel>{{ tarea.nombre }}</ng-template>
            <div>
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button matStepperNext>Next</button>
            </div>
          </mat-step>
        </mat-horizontal-stepper>

        <div class="buttons-footer">
          <button class="button-back" mat-button 
            [disabled]="verticalStepper.selectedIndex === 0"
            (click)="goBackPaso(verticalStepper)">
          <mat-icon>arrow_back</mat-icon>
            Back General</button>
          <!--<span flex></span> --> 
          <button class="button-next" mat-button 
            [disabled]="verticalStepper.selectedIndex === (verticalStepper._steps && verticalStepper._steps.length-1)"
            (click)="goNextPaso(verticalStepper)">
          Next General
          <mat-icon>arrow_forward</mat-icon>
          </button>
        </div>
      </mat-card>

      <!-- <footer class="footer"> -->
        <!-- <div class="footer-container" *ngIf="footerNav"> -->
        <!-- <div class="footer-container" > -->
          <!--<a class="left" *ngIf="footerNav.prev" [routerLink]="[footerNav.prev.route]"> -->
          <!-- <a class="left" > -->
            <!-- <i class="material-icons arrow-L">arrow_back</i> -->
            <!-- <span class="direction">Previous</span> -->
            <!-- <div>El nombre del anterior</div> -->
            <!--<div>{{footerNav.prev.name}}</div>-->
          <!-- </a> -->
          <!-- <a class="right" *ngIf="footerNav.next" [routerLink]="[footerNav.next.route]"> -->
          <!-- <a class="right" > -->
            <!-- <i class="material-icons arrow-R">arrow_forward</i> -->
            <!-- <span class="direction">Next</span> -->
            <!-- <div>El nombre del siguiente</div> -->
            <!--<div>{{footerNav.next.name}}</div>-->
          <!-- </a> -->
        <!-- </div> -->
      <!-- </footer> -->


    </mat-sidenav-content>
    <!--<div class="my-content">Main content</div>-->
  </mat-sidenav-container>
  `,
  styleUrls: ['./flow-tesis-proceso-page.component.scss'],
  providers: [
    EtapaService,
    TareaService
  ]
})
export class FlowTesisProcesoPageComponent implements OnInit {
  public etapas$: Observable<Etapa[]>;
  public tareas$: Observable<Tarea[]>;
  @ViewChild('verticalStepper') private verticalStepper: MatStepper;
  // 
  // https://stackoverflow.com/questions/46469233/can-i-programatically-move-the-steps-of-a-mat-horizontal-stepper-in-angular-an

  constructor(
    private etapaService: EtapaService, 
    private route: ActivatedRoute,
    private tareaService: TareaService) { }
    
    ngOnInit() {
      this.etapas$ = this.etapaService.etapas;
      this.tareas$ = this.tareaService.tareas;

      this.onSubscribeVerticalStepper();

        this.route.params.subscribe(params => {
        let TesisProcesoId = params['id'];
        if(TesisProcesoId) {
        this.getEtapasByProcesoId(TesisProcesoId);
      } else {
        console.log('No hay id de la tesis.')
      }
    });
  }
  
  getEtapasByProcesoId(TesisProcesoId: string) {
    // console.log('TesisProcesoId', TesisProcesoId);
    this.etapaService.getEtapasByTesisProcesoId(TesisProcesoId);
    // this.etapaService.getAllEtapas();
  }

  goBackPaso(stepper: MatStepper) {
    stepper.previous();
    // let etapa_id = stepper.selected.label;
    // console.log(etapa_id);
    // this.tareaService.getTareasByEtapaId(etapa_id);
  }
  
  goNextPaso(stepper: MatStepper) {
    stepper.next();
    // let etapa_id = stepper.selected.label;
    // console.log(etapa_id);
    // this.tareaService.getTareasByEtapaId(etapa_id);
  }

  onSubscribeVerticalStepper() {
    this.verticalStepper.selectionChange.asObservable()
        .subscribe((stepper: StepperSelectionEvent) => {
          let etapa_id = stepper.selectedStep.label;
          this.tareaService.getTareasByEtapaId(etapa_id);
        });
  }

  // get icon(){
    // return 'arrow_back'
  // }
}
