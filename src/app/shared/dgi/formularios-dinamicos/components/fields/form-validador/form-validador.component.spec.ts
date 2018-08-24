import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormValidadorComponent } from './form-validador.component';

describe('DgiFormValidadorComponent', () => {
  let component: DgiFormValidadorComponent;
  let fixture: ComponentFixture<DgiFormValidadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormValidadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormValidadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
