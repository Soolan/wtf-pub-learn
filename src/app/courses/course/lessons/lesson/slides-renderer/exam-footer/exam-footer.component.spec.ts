import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFooterComponent } from './exam-footer.component';

describe('FooterComponent', () => {
  let component: ExamFooterComponent;
  let fixture: ComponentFixture<ExamFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
