import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyDynamicFormComponent } from './many-dynamic-form.component';

describe('ManyDynamicFormComponent', () => {
  let component: ManyDynamicFormComponent;
  let fixture: ComponentFixture<ManyDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManyDynamicFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManyDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
