import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormCheckboxComponent } from './form-checkbox.component';

describe('DgiFormCheckboxComponent', () => {
  let component: DgiFormCheckboxComponent;
  let fixture: ComponentFixture<DgiFormCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
