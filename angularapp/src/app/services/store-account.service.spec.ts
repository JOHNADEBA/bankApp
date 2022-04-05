import { TestBed } from '@angular/core/testing';

import { StoreAccountService } from './store-account.service';

describe('StoreAccountService', () => {
  let service: StoreAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
