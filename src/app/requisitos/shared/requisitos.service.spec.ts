import { TestBed, inject } from '@angular/core/testing';

import { RequisitosService } from './requisitos.service';

describe('RequisitosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequisitosService]
    });
  });

  it('should be created', inject([RequisitosService], (service: RequisitosService) => {
    expect(service).toBeTruthy();
  }));
});
