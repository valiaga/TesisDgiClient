import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormDatepickerComponent } from './form-datepicker.component';

describe('DgiFormDatepickerComponent', () => {
  let component: DgiFormDatepickerComponent;
  let fixture: ComponentFixture<DgiFormDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormDatepickerComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
