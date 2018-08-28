import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormTelComponent } from './form-tel.component';

describe('DgiFormTelComponent', () => {
  let component: DgiFormTelComponent;
  let fixture: ComponentFixture<DgiFormTelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormTelComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormTelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
