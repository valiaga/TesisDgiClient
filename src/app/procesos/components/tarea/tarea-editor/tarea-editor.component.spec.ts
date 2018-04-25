import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaEditorComponent } from './tarea-editor.component';

describe('TareaEditorComponent', () => {
  let component: TareaEditorComponent;
  let fixture: ComponentFixture<TareaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TareaEditorComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
