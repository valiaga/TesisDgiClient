import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormButtonSubmitComponent } from './form-button-submit.component';

describe('FormButtonSubmitComponent', () => {
  let component: FormButtonSubmitComponent;
  let fixture: ComponentFixture<FormButtonSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormButtonSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
