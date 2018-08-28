import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormTextareaComponent } from './form-textarea.component';

describe('DgiFormTextareaComponent', () => {
  let component: DgiFormTextareaComponent;
  let fixture: ComponentFixture<DgiFormTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormTextareaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
