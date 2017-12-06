import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-about',
  template: `
    <button (click)="byEmail=true">By Email</button>
    <button (click)="byEmail=false">By Social</button>
    <div *ngIf="byEmail;then thenTemplate else elseTemplate"></div>

    <ng-template #thenTemplate>
      Contacto by email
    </ng-template>
    <ng-template #elseTemplate>
      Contacto by social      
    </ng-template>
  `,
  styles: []
})
export class AboutComponent implements OnInit {
  public byEmail:Boolean=true;

  constructor() { }

  ngOnInit() {
  }

}
