import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DgiFormEmailComponent } from './form-email.component';

describe('DgiFormEmailComponent', () => {
  let component: DgiFormEmailComponent;
  let fixture: ComponentFixture<DgiFormEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DgiFormEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DgiFormEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
