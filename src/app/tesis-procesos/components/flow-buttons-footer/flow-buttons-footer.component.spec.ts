import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowButtonsFooterComponent } from './flow-buttons-footer.component';

describe('FlowButtonsFooterComponent', () => {
  let component: FlowButtonsFooterComponent;
  let fixture: ComponentFixture<FlowButtonsFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowButtonsFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowButtonsFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
