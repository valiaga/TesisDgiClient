import { Proceso } from '../modelos/proceso.model';
import { ActivatedRoute } from '@angular/router';
import { ProcesoService } from '../shared/proceso.service';
import { Component, OnInit } from '@angular/core';

import { StepState } from '@covalent/core';

@Component({
  selector: 'dgi-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public proceso: Proceso;
  stateStep2: StepState = StepState.Required;
  activeDeactiveStep1Msg: string = 'No select/deselect detected yet';
  disabled: boolean = false;
  constructor(private route: ActivatedRoute, private procesoService: ProcesoService) { }

  ngOnInit() {
    // subscripción al observable params
    this.route.params.subscribe(params => {
      const ProcesoId = params['id'].toString(); // recpeción del parámetro

      this.procesoService.getProcesoById(ProcesoId);
    })
  }

  toggleRequiredStep2(): void {
    this.stateStep2 = (this.stateStep2 === StepState.Required ? StepState.None : StepState.Required);
  }
  activeStep1Event(): void {
    this.activeDeactiveStep1Msg = 'Active event emitted.';
  }

}
