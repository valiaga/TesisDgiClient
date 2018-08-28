import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTesisProcesoPageComponent } from './flow-tesis-proceso-page.component';

describe('FlowTesisProcesoPageComponent', () => {
  let component: FlowTesisProcesoPageComponent;
  let fixture: ComponentFixture<FlowTesisProcesoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTesisProcesoPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTesisProcesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
