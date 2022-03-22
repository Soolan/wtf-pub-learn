import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardReviewComponent } from './hard-review.component';

describe('HardReviewComponent', () => {
  let component: HardReviewComponent;
  let fixture: ComponentFixture<HardReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HardReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
