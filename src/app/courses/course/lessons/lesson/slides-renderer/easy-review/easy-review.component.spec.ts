import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyReviewComponent } from './easy-review.component';

describe('EasyReviewComponent', () => {
  let component: EasyReviewComponent;
  let fixture: ComponentFixture<EasyReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EasyReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
