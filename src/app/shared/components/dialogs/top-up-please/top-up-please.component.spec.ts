import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpPleaseComponent } from './top-up-please.component';

describe('TopUpPleaseComponent', () => {
  let component: TopUpPleaseComponent;
  let fixture: ComponentFixture<TopUpPleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopUpPleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopUpPleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
