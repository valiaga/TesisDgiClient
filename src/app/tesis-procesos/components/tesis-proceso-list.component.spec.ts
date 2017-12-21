import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisProcesosListComponent } from './tesis-procesos-list.component';

describe('TesisProcesosListComponent', () => {
  let component: TesisProcesosListComponent;
  let fixture: ComponentFixture<TesisProcesosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesisProcesosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisProcesosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
