import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaInvestigacionSearchComponent } from './linea-investigacion-search.component';

describe('LineaInvestigacionSearchComponent', () => {
  let component: LineaInvestigacionSearchComponent;
  let fixture: ComponentFixture<LineaInvestigacionSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaInvestigacionSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaInvestigacionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
