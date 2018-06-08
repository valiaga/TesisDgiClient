import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormSelectComponent } from './form-select.component';

describe('DgiFormSelectComponent', () => {
  let component: DgiFormSelectComponent;
  let fixture: ComponentFixture<DgiFormSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
