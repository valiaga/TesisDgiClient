import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormRadioComponent } from './form-radio.component';

describe('DgiFormRadioComponent', () => {
  let component: DgiFormRadioComponent;
  let fixture: ComponentFixture<DgiFormRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
