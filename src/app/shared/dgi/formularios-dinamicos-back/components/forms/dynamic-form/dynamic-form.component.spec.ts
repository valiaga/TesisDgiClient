import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiDynamicFormComponent } from './dynamic-form.component';

describe('DgiDynamicFormComponent', () => {
  let component: DgiDynamicFormComponent;
  let fixture: ComponentFixture<DgiDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
