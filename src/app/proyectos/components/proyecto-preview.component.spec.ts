import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoPreviewComponent } from './proyecto-preview.component';

describe('ProyectoPreviewComponent', () => {
  let component: ProyectoPreviewComponent;
  let fixture: ComponentFixture<ProyectoPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
