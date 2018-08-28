// import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Proceso } from '../models/proceso.model';

@Component({
  selector: 'dgi-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {

  public procesoForm: FormGroup;
  public proceso: Proceso;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createNewProceso();
    this.buildForm();
  }

  public createNewProceso() {
    this.proceso = new Proceso('', '', false, '', '', '');
  }

  public buildForm() {
    const controls = this.initializeControls();
    this.procesoForm = this.formBuilder.group(controls);
  }

  public initializeControls() {
    const controls = {
      id: [this.proceso.id],
      nombre: [this.proceso.nombre, [Validators.required]],
      decripcion: [this.proceso.descripcion],
      activo: [this.proceso.activo],
    };

    return controls;
  }

  cancelar() {
    // console.log('Cancelar');
    // this.router.
  }
}
