import { TestBed, inject } from '@angular/core/testing';

import { TesisProcesoService } from './tesis-proceso.service';

describe('TesisProcesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TesisProcesoService]
    });
  });

  it('should be created', inject([TesisProcesoService], (service: TesisProcesoService) => {
    expect(service).toBeTruthy();
  }));
});
