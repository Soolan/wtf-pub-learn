import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixedFillInComponent } from './mixed-fill-in.component';

describe('MixedFillInComponent', () => {
  let component: MixedFillInComponent;
  let fixture: ComponentFixture<MixedFillInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixedFillInComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MixedFillInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
