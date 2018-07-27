import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesisProcesoListComponent } from './tesis-proceso-list.component';

describe('TesisProcesoListComponent', () => {
  let component: TesisProcesoListComponent;
  let fixture: ComponentFixture<TesisProcesoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TesisProcesoListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesisProcesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
