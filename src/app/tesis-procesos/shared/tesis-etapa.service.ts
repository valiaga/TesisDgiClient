import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endPoints } from '../../lib/entity-data/end-points';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { ITesisEtapa } from './tesis-etapa';

@Injectable()
export class TesisEtapaService extends EntityDataService<ITesisEtapa> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.tesisProceso.tesisEtapas);
  }

}
