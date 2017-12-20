import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'dgi-create-linea-investigacion-dialog',
  template: `
    <div class="linea-investigacion-container">
      <!-- <h4 mat-dialog-title>Nueva linea de investigación</h4> -->
      <h5>Nueva linea de investigación</h5>
      <form [formGroup]="createForm">
      
      </form>

      <!-- Nombre field -->
      <mat-form-field
        [hideRequiredMarker]="[false]"
        [floatLabel]="['auto']">
        <input matInput placeholder="Nombre" formControlName="nombre" required>
        <mat-error *ngIf="nombre.invalid">Error</mat-error>
      </mat-form-field>

      <!-- Descripción field -->
      <mat-form-field
        [floatLabel]="['auto']">
        <textarea matInput placeholder="Descripción" matTextareaAutosize 
          matAutosizeMaxRows="5" formControlName="descripcion"
          matAutosizeMinRows="2"></textarea>
      </mat-form-field>

      <!-- Activo field -->
      <!-- <form class="linea-investigacion-container"> -->
      <form >
        <mat-checkbox formControlName="activo">Activo</mat-checkbox>
      </form>

      <!-- Escuela field -->      
      <mat-form-field
        [hideRequiredMarker]="[false]">
        <mat-select placeholder="Seleccionar Escuela" formControlName="escuela" required>
          <mat-option value="1">Escuela 1</mat-option>
          <mat-option value="2">Escuela 2</mat-option>
        </mat-select>
      </mat-form-field>
      
      <!-- Buttons Actions -->
      <div mat-dialog-actions>
        <button mat-button tabindex="0">Aceptar</button>
        <button mat-button tabindex="0">Cancelar</button>
      </div>

    </div>
  `,
  styles: [
  `
    .linea-investigacion-container{
      /* display: flex; 
      flex-direction: column; */
    }
    .linea-investigacion-container form{
      margin-bottom: 20px;
    }
  `
  ]
})
export class CreateLineaInvestigacionDialogComponent implements OnInit {

  public createForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<CreateLineaInvestigacionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder) { }
  
  ngOnInit() {

  }

  initializeControls(){
    const controls = {
      id: [],
      nombre: [],
      descripcion: [],
      activo: [],
      escuela: [],
      // fecha_creacion: [],
      // fecha_actualizacion: []
    }
    return controls;
  }

  buildForm(){
    const controls = this.initializeControls();
    this.createForm = this.formBuilder.group(controls);
  }
}
