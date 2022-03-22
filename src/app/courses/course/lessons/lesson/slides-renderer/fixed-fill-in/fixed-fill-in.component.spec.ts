import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedFillInComponent } from './fixed-fill-in.component';

describe('FixedFillInComponent', () => {
  let component: FixedFillInComponent;
  let fixture: ComponentFixture<FixedFillInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FixedFillInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedFillInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
