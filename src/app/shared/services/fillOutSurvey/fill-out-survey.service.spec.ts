import { TestBed } from '@angular/core/testing';

import { FillOutSurveyService } from './fill-out-survey.service';

describe('FillOutSurveyService', () => {
  let service: FillOutSurveyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FillOutSurveyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
