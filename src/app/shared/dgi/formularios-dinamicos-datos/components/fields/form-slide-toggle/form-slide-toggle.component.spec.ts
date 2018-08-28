import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormSlideToggleComponent } from './form-slide-toggle.component';

describe('DgiFormSlideToggleComponent', () => {
  let component: DgiFormSlideToggleComponent;
  let fixture: ComponentFixture<DgiFormSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormSlideToggleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
