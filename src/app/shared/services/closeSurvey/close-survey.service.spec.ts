import { TestBed } from '@angular/core/testing';

import { CloseSurveyService } from './close-survey.service';

describe('CloseSurveyService', () => {
  let service: CloseSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
