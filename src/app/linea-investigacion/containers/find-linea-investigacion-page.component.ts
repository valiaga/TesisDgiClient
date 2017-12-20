import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-find-linea-investigacion-page',
  template: `
    <dgi-linea-investigacion-search></dgi-linea-investigacion-search>
    <dgi-linea-investigacion-list></dgi-linea-investigacion-list>
  `,
  styles: [
    `
    `
  ]
})
export class FindLineaInvestigacionPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
