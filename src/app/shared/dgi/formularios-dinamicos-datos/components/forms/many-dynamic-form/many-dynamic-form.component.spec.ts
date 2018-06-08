import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiManyDynamicFormComponent } from './many-dynamic-form.component';

describe('DgiManyDynamicFormComponent', () => {
  let component: DgiManyDynamicFormComponent;
  let fixture: ComponentFixture<DgiManyDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiManyDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiManyDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
