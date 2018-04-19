import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolProcesoComponent } from './rol-proceso.component';

describe('RolProcesoComponent', () => {
  let component: RolProcesoComponent;
  let fixture: ComponentFixture<RolProcesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolProcesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
