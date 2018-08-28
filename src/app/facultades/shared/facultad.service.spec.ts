import { TestBed, inject } from '@angular/core/testing';

import { FacultadService } from './facultad.service';

describe('FacultadService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacultadService],
    });
  });

  it('should be created', inject([FacultadService], (service: FacultadService) => {
    expect(service).toBeTruthy();
  }));
});
