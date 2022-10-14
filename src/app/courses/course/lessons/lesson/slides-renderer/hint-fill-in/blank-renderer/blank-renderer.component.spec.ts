import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankRendererComponent } from './blank-renderer.component';

describe('BlankRendererComponent', () => {
  let component: BlankRendererComponent;
  let fixture: ComponentFixture<BlankRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlankRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
