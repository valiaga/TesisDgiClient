import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaEditorComponent } from './etapa-editor.component';

describe('EtapaEditorComponent', () => {
  let component: EtapaEditorComponent;
  let fixture: ComponentFixture<EtapaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaEditorComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
