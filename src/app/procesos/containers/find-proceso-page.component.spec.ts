import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProcesoPageComponent } from './find-proceso-page.component';

describe('FindProcesoPageComponent', () => {
  let component: FindProcesoPageComponent;
  let fixture: ComponentFixture<FindProcesoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindProcesoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindProcesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
