import { TestBed, inject } from '@angular/core/testing';

import { GroupByPipe } from './group-by.service';

describe('GroupByService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GroupByPipe]
    });
  });

  it('should be created', inject([GroupByPipe], (service: GroupByPipe) => {
    expect(service).toBeTruthy();
  }));
});
