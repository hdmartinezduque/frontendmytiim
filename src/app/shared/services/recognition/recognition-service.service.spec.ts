import { TestBed } from '@angular/core/testing';

import { RecognitionServiceService } from '../../services/recognition/recognition-service.service';

describe('RecognitionServicesService', () => {
  let service: RecognitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecognitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
