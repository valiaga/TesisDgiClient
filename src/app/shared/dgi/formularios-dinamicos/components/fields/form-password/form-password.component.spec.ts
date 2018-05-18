import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormPasswordComponent } from './form-password.component';

describe('DgiFormPasswordComponent', () => {
  let component: DgiFormPasswordComponent;
  let fixture: ComponentFixture<DgiFormPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
