import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormButtonComponent } from './form-button.component';

describe('DgiFormButtonComponent', () => {
  let component: DgiFormButtonComponent;
  let fixture: ComponentFixture<DgiFormButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
