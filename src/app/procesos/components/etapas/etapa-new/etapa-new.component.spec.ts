import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtapaNewComponent } from './etapa-new.component';

describe('EtapaNewComponent', () => {
  let component: EtapaNewComponent;
  let fixture: ComponentFixture<EtapaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtapaNewComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtapaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
