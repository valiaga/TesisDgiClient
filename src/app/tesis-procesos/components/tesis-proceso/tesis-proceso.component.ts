import { Component, OnInit, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { TesisProcesoService, TesisProceso } from '../../shared';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { MESSAGES } from '../../../../config/messages';
import { getMessageConfirm } from '../../../../config/general';
import { TdDialogService } from '@covalent/core';

@Component({
  selector: 'dgi-tesis-proceso',
  template: `
  <!-- <a > -->
    <mat-card class="mat-card">
      <mat-card-header>
        <!-- <div mat-card-avatar class="example-header-image"></div> -->
        <!-- <mat-card-title><p>{{ tp.proyecto }}</p> </mat-card-title> -->
        <button mat-icon-button color="primary" [matMenuTriggerFor]="tesisProcesoMenu">
          <mat-icon>more_vert</mat-icon>
        </button>
        <mat-card-subtitle>Vitmar Aliaga & Alejandro Carpio</mat-card-subtitle>
      </mat-card-header>
      <!-- <img mat-card-image src="http://wellmedicated.com/wp-content/uploads/2009/06/moral-relativism.jpg" alt="Mi Libro">      -->
      <mat-card-content>
        {{ tesisProceso.proyecto }}
          <!-- <img src="http://wellmedicated.com/wp-content/uploads/2009/06/moral-relativism.jpg" alt=""> -->
          <!-- {{ tp.id }}-->
      </mat-card-content>
    </mat-card>
  <!-- </a> -->

  <mat-menu #tesisProcesoMenu="matMenu" yPosition="below" xPosition="before">
    <a target="_blank" mat-menu-item [routerLink]="['/tesis-procesos', tesisProceso.id]">
      <mat-icon>class</mat-icon>
      <span>Ver</span>
    </a>
    <button mat-menu-item [routerLink]="['./tesis-procesos', tesisProceso.id]">
      <mat-icon>person_add</mat-icon>
      <span>Agregar Tesista</span>
    </button>
    <button mat-menu-item (click)="deleteTesisProceso(tesisProceso.id)">
      <mat-icon>delete</mat-icon>
      <span>Eliminar</span>
      </button>
    <button mat-menu-item>
      <mat-icon>settings</mat-icon>
      <span>Settings</span>
    </button>
  </mat-menu>
  `,
  styles: [
    `
    .mat-card-subtitle{
      padding-top: 15px;
      padding-right: 0px;
      padding-left: 0px;
      font-size: 13px;
    }
    .mat-card-content {
      padding-right: 10px;
      padding-left: 10px;
      /* cursor: pointer; */
      height: 7rem;
      overflow: hidden;
      /*white-space: nowrap;*/
      text-overflow: ellipsis;
    }

    .mat-card{
      width: 15em;
      min-width: 15em;
    }
    .mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
  /*
    a {
      color: inherit;
      text-decoration: none;
    }*/

    `
  ],
  providers: [
    // MessagesService
  ]
})
export class TesisProcesoComponent implements OnInit {

  @Input() tesisProceso: TesisProceso;

  constructor(private tesisProcesoService: TesisProcesoService,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
  ) { }

  ngOnInit() {

  }

  deleteTesisProceso(tesisProcesoId: string) {

    this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesisProceso.confirmDelete, this.viewContainerRef))
      .afterClosed().subscribe((accept: boolean) => {
        if (accept) {
          this.tesisProcesoService.deleteTesisProceso(tesisProcesoId);
        } else {
        }
      });
  }
}