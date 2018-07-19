import { Injectable } from '@angular/core';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { HttpClient } from '@angular/common/http';
import { ITesista } from './tesista';
import { endPoints } from '../../lib/entity-data/end-points';

@Injectable({
  providedIn: 'root',
})
export class TesistasService extends EntityDataService<ITesista> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.proyecto.tesistas);
  }
}
