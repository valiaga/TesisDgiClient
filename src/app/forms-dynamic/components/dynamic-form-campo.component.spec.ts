import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormCampoComponent } from './dynamic-form-campo.component';

describe('DynamicFormCampoComponent', () => {
  let component: DynamicFormCampoComponent;
  let fixture: ComponentFixture<DynamicFormCampoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormCampoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormCampoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
