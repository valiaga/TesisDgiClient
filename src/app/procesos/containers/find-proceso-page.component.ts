import { Component, OnInit } from '@angular/core';
import { Proceso } from '../shared/proceso.model';
import { Observable } from 'rxjs/Observable';
import { ProcesoService } from '../shared/proceso.service';

@Component({
  selector: 'dgi-find-proceso-page',
  template: `
    <dgi-proceso-search></dgi-proceso-search>
    <dgi-proceso-list
      [procesos]="procesos$ | async"
      ></dgi-proceso-list>

      
    <dgi-button-fab routerLink="/procesos/nuevo" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
    <!-- <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab> -->

  `,
  styles: [

    `
    /* 
    .card-container{
      display: flex;
      flex-flow: row wrap;
    } */
      /*
    dgi-proceso-lista{
        display: flex;
        flex-flow: row wrap;
    }*/
    `
  ]
})
export class FindProcesoPageComponent implements OnInit {
  public procesos$: Observable<Proceso[]>;

  constructor(private procesoService: ProcesoService) { }

  ngOnInit() {
    this.procesos$ = this.procesoService.procesos;
    this.getProcesos();
  }

  getProcesos() {
    this.procesoService.getAllProcesos();
  }

}
