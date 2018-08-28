import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaSearchComponent } from './escuela-search.component';

describe('EscuelaSearchComponent', () => {
  let component: EscuelaSearchComponent;
  let fixture: ComponentFixture<EscuelaSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscuelaSearchComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscuelaSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
