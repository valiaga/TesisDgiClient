import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Component({
  selector: 'dgi-proyecto-preview',
  template: `
    <a [routerLink]="['/proyectos', id]">
    <mat-card>
      <mat-card-title-group>
        <img mat-card-sm-image *ngIf="miniatura" [src]="miniatura"/>
        <!-- <mat-card-title>{{ titulo | bcEllipsis:35 }}</mat-card-title> -->
        <mat-card-title>{{ titulo }}</mat-card-title>
        <!-- <mat-card-subtitle *ngIf="resumen">{{ resumen | bcEllipsis:40 }}</mat-card-subtitle> -->
        <mat-card-subtitle *ngIf="titulo">{{ titulo }}</mat-card-subtitle>
      </mat-card-title-group>
      <mat-card-content>
        <!-- <p *ngIf="resumen">{{ resumen | bcEllipsis }}</p>-->
        <p *ngIf="resumen">{{ resumen }}</p>
      </mat-card-content>
      <mat-card-footer>
        <dgi-proyecto-authors [proyecto]="proyecto"></dgi-proyecto-authors>
      </mat-card-footer>
    </mat-card>
    </a> 
  `,
  styles: []
})
export class ProyectoPreviewComponent implements OnInit {
  @Input() proyecto: Proyecto;

  constructor() { }

  ngOnInit() {
  }

  get id(){
    return this.proyecto.id;
  }
   
  get titulo(){
    return this.proyecto.titulo;
  }

  get resumen(){
    return this.proyecto.resumen
  }

  get miniatura(): string | boolean{
    return 'http://books.google.com/books/content?id=Z6QDAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';
    // if ( this.proyecto.miniaturaLinks) {
      // return this.proyecto.miniaturaLinks.smallThumbnail;
    // }
    // return false
  }

}
