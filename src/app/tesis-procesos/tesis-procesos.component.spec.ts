import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisProcesosComponent } from './tesis-procesos.component';

describe('TesisProcesosComponent', () => {
  let component: TesisProcesosComponent;
  let fixture: ComponentFixture<TesisProcesosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesisProcesosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisProcesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
