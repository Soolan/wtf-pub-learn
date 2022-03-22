import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HintFillInComponent } from './hint-fill-in.component';

describe('HintFillInComponent', () => {
  let component: HintFillInComponent;
  let fixture: ComponentFixture<HintFillInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HintFillInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HintFillInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
