import { TestBed } from '@angular/core/testing';

import { ProgressIndicatorService } from './progress-indicator.service';

describe('ProgressIndicatorService', () => {
  let service: ProgressIndicatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgressIndicatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
