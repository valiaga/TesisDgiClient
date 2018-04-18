import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'dgi-button-fab',
  template: `
    <!--
    <h1>color: {{color}}</h1>
    <h1>icon: {{icon}}</h1>  -->
    <button mat-fab color="{{color}}" class="button-fab" ><mat-icon>{{ icon }}</mat-icon></button>
  `,
  styles: [
    `
    .button-fab{
      position: absolute;
      right: 20px;
      bottom: 20px
    }
    `
  ]
})
export class ButtonFabComponent implements OnInit {

  @Input() color: string; /** primary; accent, warn */
  @Input() icon: string;

  constructor() { }

  ngOnInit() {
  }
}
