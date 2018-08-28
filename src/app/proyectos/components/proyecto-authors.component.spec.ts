import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoAuthorsComponent } from './proyecto-authors.component';

describe('ProyectoAuthorsComponent', () => {
  let component: ProyectoAuthorsComponent;
  let fixture: ComponentFixture<ProyectoAuthorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoAuthorsComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoAuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
