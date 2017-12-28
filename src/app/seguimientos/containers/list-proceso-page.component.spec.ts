import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProcesoPageComponent } from './list-proceso-page.component';

describe('ListProcesoPageComponent', () => {
  let component: ListProcesoPageComponent;
  let fixture: ComponentFixture<ListProcesoPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProcesoPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProcesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
