import { TestBed } from '@angular/core/testing';

import { ContinuousSurveyService } from './continuous-survey.service';

describe('ContinuousSurveyService', () => {
  let service: ContinuousSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContinuousSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
