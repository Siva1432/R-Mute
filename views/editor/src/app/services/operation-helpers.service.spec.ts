import { TestBed } from '@angular/core/testing';

import { OperationHelpersService } from './operation-helpers.service';

describe('OperationHelpersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OperationHelpersService = TestBed.get(OperationHelpersService);
    expect(service).toBeTruthy();
  });
});
