import { TestBed } from '@angular/core/testing';

import { ToggleHeaderFooterService } from './toggle-header-footer.service';

describe('ToggleHeaderFooterService', () => {
  let service: ToggleHeaderFooterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleHeaderFooterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
