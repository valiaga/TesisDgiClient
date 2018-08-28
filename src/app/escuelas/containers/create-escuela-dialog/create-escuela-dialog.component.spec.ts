import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEscuelaDialogComponent } from './create-escuela-dialog.component';

describe('CreateEscuelaDialogComponent', () => {
  let component: CreateEscuelaDialogComponent;
  let fixture: ComponentFixture<CreateEscuelaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEscuelaDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEscuelaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
