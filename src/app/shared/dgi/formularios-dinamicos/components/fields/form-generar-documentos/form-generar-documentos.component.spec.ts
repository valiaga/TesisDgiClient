import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormGenerarDocumentosComponent } from './form-generar-documentos.component';

describe('DgiFormGenerarDocumentosComponent', () => {
  let component: DgiFormGenerarDocumentosComponent;
  let fixture: ComponentFixture<DgiFormGenerarDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DgiFormGenerarDocumentosComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormGenerarDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
