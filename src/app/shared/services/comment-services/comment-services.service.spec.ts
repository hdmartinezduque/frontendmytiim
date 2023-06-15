import { TestBed } from '@angular/core/testing';

import { CommentServicesService } from './comment-services.service';

describe('CommentServicesService', () => {
  let service: CommentServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
