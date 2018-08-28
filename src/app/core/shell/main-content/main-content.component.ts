import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-main-content',
  template: `
    <section class="demo-container">
    <router-outlet></router-outlet>
    </section>
  `,
  styles: [
    `
    .demo-container{
      padding-bottom: 5rem;
    }
    `,
  ],
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
