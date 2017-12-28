import { TestBed, inject } from '@angular/core/testing';

import { EtapaService } from './etapa.service';

describe('EtapaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EtapaService]
    });
  });

  it('should be created', inject([EtapaService], (service: EtapaService) => {
    expect(service).toBeTruthy();
  }));
});
