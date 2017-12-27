import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-app',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
