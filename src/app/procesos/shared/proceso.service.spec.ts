import { TestBed, inject } from '@angular/core/testing';

import { ProcesoService } from './proceso.service';

describe('ProcesoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcesoService]
    });
  });

  it('should be created', inject([ProcesoService], (service: ProcesoService) => {
    expect(service).toBeTruthy();
  }));
});
