import { TestBed } from '@angular/core/testing';

import { CompromiseServicesService } from './compromise-services.service';

describe('CompromiseServicesService', () => {
  let service: CompromiseServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompromiseServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
