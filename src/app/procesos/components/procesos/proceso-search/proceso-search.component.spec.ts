import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoSearchComponent } from './proceso-search.component';

describe('ProcesoSearchComponent', () => {
  let component: ProcesoSearchComponent;
  let fixture: ComponentFixture<ProcesoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesoSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
