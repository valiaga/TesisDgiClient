import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaInvestigacionListComponent } from './linea-investigacion-list.component';

describe('LineaInvestigacionListComponent', () => {
  let component: LineaInvestigacionListComponent;
  let fixture: ComponentFixture<LineaInvestigacionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineaInvestigacionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineaInvestigacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
