import { Component, OnInit, Input } from '@angular/core';
import { Proyecto } from '../models/proyecto';

@Component({
  selector: 'dgi-proyecto-preview',
  template: `
    <a [routerLink]="['/proyectos', id]">
    <mat-card>
      <mat-card-title-group>
        <!-- <img mat-card-sm-image *ngIf="miniatura" [src]="miniatura"/>-->
        <!-- <mat-card-title>{{ titulo | bcEllipsis:35 }}</mat-card-title> -->
        <mat-card-title> <p>{{ titulo }}</p></mat-card-title>
        <!-- <mat-card-subtitle *ngIf="resumen">{{ resumen | bcEllipsis:40 }}</mat-card-subtitle> -->
        <mat-card-subtitle *ngIf="titulo">{{ titulo }}</mat-card-subtitle>
      </mat-card-title-group>
      <mat-card-content>
        <!-- <p *ngIf="resumen">{{ resumen | bcEllipsis }}</p>-->
        <p *ngIf="resumen">{{ resumen }}</p>
      </mat-card-content>
      <mat-card-footer>
        <!-- <dgi-proyecto-authors [proyecto]="proyecto"></dgi-proyecto-authors> -->
      </mat-card-footer>
    </mat-card>
    </a>
  `,
  styles: [
    `
    :host {
      display: flex;
    }
    :host a {
      display: flex;
    }
    mat-card {
      /*width: 400px;
      margin: 15px;*/
      display: flex;
      flex-flow: column;
      justify-content: space-between;
    }
    @media only screen and (max-width: 768px) {
      mat-card {
       /* margin: 15px 0 !important;*/
      }
    }
    mat-card:hover {
      box-shadow: 3px 3px 16px -2px rgba(0, 0, 0, .5);
    }
    mat-card-title {
      margin-right: 10px;
      font-size: 1.3rem;
    }
    mat-card-title-group {
      margin: 0;
    }
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      width: 60px;
      min-width: 60px;
      margin-left: 5px;
    }
    mat-card-content {
      /*margin-top: 15px;
      margin: 15px 0 0;*/
    }
    span {
      display: inline-block;
      font-size: 13px;
    }
    /*mat-card-footer {
      padding: 0 25px 25px;
    }*/
    `
  ]
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
    return this.proyecto.resumen;
  }

  get miniatura(): string | boolean{
    return 'http://books.google.com/books/content?id=Z6QDAwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api';
    // if ( this.proyecto.miniaturaLinks) {
      // return this.proyecto.miniaturaLinks.smallThumbnail;
    // }
    // return false
  }

}
