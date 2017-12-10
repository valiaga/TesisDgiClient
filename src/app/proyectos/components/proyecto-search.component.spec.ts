import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoSearchComponent } from './proyecto-search.component';

describe('ProyectoSearchComponent', () => {
  let component: ProyectoSearchComponent;
  let fixture: ComponentFixture<ProyectoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
