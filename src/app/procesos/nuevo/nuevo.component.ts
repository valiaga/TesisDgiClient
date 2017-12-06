import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dgi-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  cancelar(){
    console.log("Cancelar");
    // this.router.
  }
}
