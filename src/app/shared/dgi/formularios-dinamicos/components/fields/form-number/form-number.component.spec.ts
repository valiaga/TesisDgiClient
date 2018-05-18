import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormNumberComponent } from './form-number.component';

describe('DgiFormNumberComponent', () => {
  let component: DgiFormNumberComponent;
  let fixture: ComponentFixture<DgiFormNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
