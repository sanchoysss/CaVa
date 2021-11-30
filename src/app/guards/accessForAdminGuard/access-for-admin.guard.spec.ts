import { TestBed } from '@angular/core/testing';

import { AccessForAdminGuard } from './access-for-admin.guard';

describe('AccessForAdminGuard', () => {
  let guard: AccessForAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccessForAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
