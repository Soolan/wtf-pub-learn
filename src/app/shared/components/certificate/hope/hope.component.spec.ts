import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HopeComponent } from './hope.component';

describe('HopeComponent', () => {
  let component: HopeComponent;
  let fixture: ComponentFixture<HopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HopeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
