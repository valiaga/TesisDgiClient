import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectoPreviewListComponent } from './proyecto-preview-list.component';

describe('ProyectoPreviewListComponent', () => {
  let component: ProyectoPreviewListComponent;
  let fixture: ComponentFixture<ProyectoPreviewListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProyectoPreviewListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
