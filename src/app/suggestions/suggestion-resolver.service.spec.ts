import { TestBed } from '@angular/core/testing';

import { SuggestionResolverService } from './suggestion-resolver.service';

describe('SuggestionResolverService', () => {
  let service: SuggestionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuggestionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
