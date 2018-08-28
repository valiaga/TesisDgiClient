import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaListaComponent } from './etapa-lista.component';

describe('EtapaListaComponent', () => {
  let component: EtapaListaComponent;
  let fixture: ComponentFixture<EtapaListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaListaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
