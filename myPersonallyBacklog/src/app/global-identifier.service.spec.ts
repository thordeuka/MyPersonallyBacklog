import { TestBed } from '@angular/core/testing';

import { GlobalIdentifierService } from './global-identifier.service';

describe('GlobalIdentifierService', () => {
  let service: GlobalIdentifierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalIdentifierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
