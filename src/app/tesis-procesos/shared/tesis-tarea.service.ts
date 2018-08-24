import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../lib/entity-data/end-points';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { ITesisTarea } from './tesis-tarea';

@Injectable()
export class TesisTareaService extends EntityDataService<ITesisTarea> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.tesisProceso.tesisTareas);
  }

}
