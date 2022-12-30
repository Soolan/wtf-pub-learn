import { TestBed } from '@angular/core/testing';

import { DenialReasonService } from './denial-reason.service';

describe('DenialReasonService', () => {
  let service: DenialReasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DenialReasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
