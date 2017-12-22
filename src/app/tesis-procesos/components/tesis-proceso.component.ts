import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TesisProceso } from '../shared/tesis-proceso';
// import { MatMenuTrigger } from '@angular/material/menu/typings/menu-trigger';
import { MatMenuTrigger, MatSnackBar } from '@angular/material';
import { TesisProcesoService } from '../shared/tesis-proceso.service';
import { MessagesService } from '../shared/messages.service';
import { MESSAGES } from '../../../config/messages';

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
    <button mat-menu-item [routerLink]="['/tesis-procesos', tesisProceso.id]">
      <span>Ver</span>
    </button>
    <button mat-menu-item (click)="deleteTesisProceso(tesisProceso.id)">
      <!-- <mat-icon>dialpad</mat-icon>-->
      <span>Eliminar</span>
    </button>
    <button mat-menu-item><span>Settings</span></button>
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
    }

    .mat-card{
      width: 10em;
      min-width: 10em;
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
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private tesisProcesoService: TesisProcesoService,
              private snackBar: MatSnackBar,
              // private messagesService: MessagesService
             ) { }

  ngOnInit() {
    // this.messagesService.getMessages1();
    // console.log(MESSAGES.tesisProceso.delete)
  }

  deleteTesisProceso(tesisProcesoId: string) {
    this.tesisProcesoService.deleteTesisProcesoById(tesisProcesoId).subscribe(
      () => {
        this.snackBar.open(MESSAGES.tesisProceso.delete, MESSAGES.actions.delete, {
          duration: 3000,
        });
      }
    );
  }
}

// class MenuComponent {

// }