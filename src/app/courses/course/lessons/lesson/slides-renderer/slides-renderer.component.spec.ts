import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesRendererComponent } from './slides-renderer.component';

describe('SlidesRendererComponent', () => {
  let component: SlidesRendererComponent;
  let fixture: ComponentFixture<SlidesRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
