import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaTareasComponent } from './etapa-tareas.component';

describe('EtapaTareasComponent', () => {
  let component: EtapaTareasComponent;
  let fixture: ComponentFixture<EtapaTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
