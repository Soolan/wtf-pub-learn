import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalExamComponent } from './final-exam.component';

describe('FinalExamComponent', () => {
  let component: FinalExamComponent;
  let fixture: ComponentFixture<FinalExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinalExamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
