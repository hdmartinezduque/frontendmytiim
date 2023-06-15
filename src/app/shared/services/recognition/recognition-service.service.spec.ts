import { TestBed } from '@angular/core/testing';

import { RecognitionServiceService } from './recognition-service.service';

describe('RecognitionServiceService', () => {
  let service: RecognitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
