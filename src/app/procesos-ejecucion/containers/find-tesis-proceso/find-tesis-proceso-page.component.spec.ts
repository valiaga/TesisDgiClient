import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTesisProcesoPageComponent } from './find-tesis-proceso-page.component';

describe('FindTesisProcesoPageComponent', () => {
  let component: FindTesisProcesoPageComponent;
  let fixture: ComponentFixture<FindTesisProcesoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindTesisProcesoPageComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindTesisProcesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
