import { TestBed } from '@angular/core/testing';

import { PendingsServicesService } from './pendings-services.service';

describe('PendingsServicesService', () => {
  let service: PendingsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
