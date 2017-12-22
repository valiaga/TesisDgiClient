import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindEscuelaPageComponent } from './find-escuela-page.component';

describe('FindEscuelaPageComponent', () => {
  let component: FindEscuelaPageComponent;
  let fixture: ComponentFixture<FindEscuelaPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindEscuelaPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindEscuelaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
