import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisProcesoComponent } from './tesis-proceso.component';

describe('TesisProcesoComponent', () => {
  let component: TesisProcesoComponent;
  let fixture: ComponentFixture<TesisProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesisProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
