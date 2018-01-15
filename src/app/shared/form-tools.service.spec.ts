import { TestBed, inject } from '@angular/core/testing';

import { FormToolsService } from './form-tools.service';

describe('FormToolsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormToolsService]
    });
  });

  it('should be created', inject([FormToolsService], (service: FormToolsService) => {
    expect(service).toBeTruthy();
  }));
});
