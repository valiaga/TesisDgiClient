import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-find-escuela-page',
  template: `
    <dgi-escuela-search></dgi-escuela-search>
    <dgi-escuela-list></dgi-escuela-list>
    <dgi-button-fab (click)="openDialog()" [color]="['accent']" [icon]="['add']"></dgi-button-fab>
  `,
  styles: []
})
export class FindEscuelaPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  openDialog() {

  }
}
