import { TestBed, inject } from '@angular/core/testing';

import { LineaInvestigacionService } from './linea-investigacion.service';

describe('LineaInvestigacionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LineaInvestigacionService],
    });
  });

  it('should be created', inject([LineaInvestigacionService], (service: LineaInvestigacionService) => {
    expect(service).toBeTruthy();
  }));
});
