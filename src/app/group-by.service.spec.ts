import { TestBed, inject } from '@angular/core/testing';

import { GroupByService } from './group-by.service';

describe('GroupByService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupByService]
    });
  });

  it('should be created', inject([GroupByService], (service: GroupByService) => {
    expect(service).toBeTruthy();
  }));
});
