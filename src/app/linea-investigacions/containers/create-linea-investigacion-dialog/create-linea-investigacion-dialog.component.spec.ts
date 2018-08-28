import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLineaInvestigacionDialogComponent } from './create-linea-investigacion-dialog.component';

describe('CreateLineaInvestigacionDialogComponent', () => {
  let component: CreateLineaInvestigacionDialogComponent;
  let fixture: ComponentFixture<CreateLineaInvestigacionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLineaInvestigacionDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLineaInvestigacionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
