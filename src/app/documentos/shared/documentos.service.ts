import { Injectable } from '@angular/core';
import { EntityDataService } from '../../lib/entity-data/entity-data.service';
import { HttpClient } from '@angular/common/http';
import { IDocumento } from './documento';
import { endPoints } from '../../lib/entity-data/end-points';

@Injectable({
  providedIn: 'root',
})
export class DocumentosService extends EntityDataService<IDocumento> {

  constructor(protected httpClient: HttpClient) {
    super(httpClient, endPoints.proceso.documentos);
  }
}
