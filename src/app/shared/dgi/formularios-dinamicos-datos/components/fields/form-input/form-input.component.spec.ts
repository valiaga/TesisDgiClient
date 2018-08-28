import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormInputComponent } from './form-input.component';

describe('DgiFormInputComponent', () => {
  let component: DgiFormInputComponent;
  let fixture: ComponentFixture<DgiFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormInputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
