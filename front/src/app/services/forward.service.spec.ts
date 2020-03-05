import { TestBed } from '@angular/core/testing';

import { ForwardService } from './forward.service';

describe('ForwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForwardService = TestBed.get(ForwardService);
    expect(service).toBeTruthy();
  });
});
