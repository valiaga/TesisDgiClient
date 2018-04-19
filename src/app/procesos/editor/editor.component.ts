import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../shared/proceso.service';
import { Component, OnInit } from '@angular/core';

import { StepState } from '@covalent/core';
import { RolProceso } from '../models/rol-proceso.model';
import { Proceso } from '../models/proceso.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RolProcesoService } from '../shared/rol-proceso.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { RolProcesoComponent } from '../components/rol-proceso/rol-proceso.component';

@Component({
  selector: 'dgi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public procesoForm: FormGroup;
  public proceso: Proceso;
  public rolProcesos: Observable<RolProceso[]>;

  public panelOpenState = false;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private procesoService: ProcesoService,
    private rolProcesoService: RolProcesoService,
  ) { }

  ngOnInit() {
    this.rolProcesos = this.rolProcesoService.rolProcesos;
    // subscripción al observable params

    this.route.params.subscribe(params => {
      const procesoId = params['id'].toString(); // recpeción del parámetro
      this.getProceso(procesoId);
      this.loadMaters(procesoId);
    });

    this.createNewProceso();
    this.buildForm();

  }

  public loadMaters(procesoId) {
    this.rolProcesoService.getAllRolProcesos({ proceso_id: procesoId });
  }

  public newRolProceso() {
    const procesoId = this.procesoForm.get('id').value;

    const dialogRef = this.dialog.open(RolProcesoComponent, {
      width: '500px',
      data: { procesoId: procesoId },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('close dialog escuela');
    });
  }

  public getProceso(procesoId: string) {
    this.procesoService.getProcesoById$(procesoId)
      .subscribe(this.patchProceso.bind(this));
  }

  public onSubmit() {
    const valid = this.procesoForm.valid;
    const value = this.procesoForm.value;
    if (valid) {
      this.procesoService.updateProceso(value);
    }
  }

  public patchProceso(response) {
    // console.log(response);
    this.procesoForm.patchValue({
      id: response.id,
      nombre: response.nombre,
      descripcion: response.descripcion,
      activo: response.activo,
    });
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
      descripcion: [this.proceso.descripcion],
      activo: [this.proceso.activo],
    };

    return controls;
  }

  toggleRequiredStep2(): void {
    // this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }
  activeStep1Event(): void {
    // this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

}
