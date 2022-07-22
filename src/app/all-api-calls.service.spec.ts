import { TestBed } from '@angular/core/testing';

import { AllApiCallsService } from './all-api-calls.service';

describe('AllApiCallsService', () => {
  let service: AllApiCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllApiCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
