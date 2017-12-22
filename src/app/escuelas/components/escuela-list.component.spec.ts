import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaListComponent } from './escuela-list.component';

describe('EscuelaListComponent', () => {
  let component: EscuelaListComponent;
  let fixture: ComponentFixture<EscuelaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
