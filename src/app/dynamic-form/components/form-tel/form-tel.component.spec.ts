import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTelComponent } from './form-tel.component';

describe('FormTelComponent', () => {
  let component: FormTelComponent;
  let fixture: ComponentFixture<FormTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
