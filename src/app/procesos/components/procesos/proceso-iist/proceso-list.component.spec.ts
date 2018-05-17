import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoListComponent } from './proceso-list.component';

describe('ProcesoListComponent', () => {
  let component: ProcesoListComponent;
  let fixture: ComponentFixture<ProcesoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
