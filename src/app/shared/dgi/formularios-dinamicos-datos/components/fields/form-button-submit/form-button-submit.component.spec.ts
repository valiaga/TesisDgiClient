import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormButtonSubmitComponent } from './form-button-submit.component';

describe('DgiFormButtonSubmitComponent', () => {
  let component: DgiFormButtonSubmitComponent;
  let fixture: ComponentFixture<DgiFormButtonSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormButtonSubmitComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormButtonSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
