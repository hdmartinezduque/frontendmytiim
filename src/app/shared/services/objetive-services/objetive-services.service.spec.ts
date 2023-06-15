import { TestBed } from '@angular/core/testing';

import { ObjetiveServicesService } from './objetive-services.service';

describe('ObjetiveServicesService', () => {
  let service: ObjetiveServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetiveServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
