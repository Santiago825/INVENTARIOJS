import { TestBed } from '@angular/core/testing';

import { ProvedorSortService } from './provedor-sort.service';

describe('ProvedorSortService', () => {
  let service: ProvedorSortService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvedorSortService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
