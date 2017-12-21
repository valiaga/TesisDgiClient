import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLineaInvestigacionPageComponent } from './find-linea-investigacion-page.component';

describe('FindLineaInvestigacionPageComponent', () => {
  let component: FindLineaInvestigacionPageComponent;
  let fixture: ComponentFixture<FindLineaInvestigacionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLineaInvestigacionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLineaInvestigacionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
