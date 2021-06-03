import { TestBed } from '@angular/core/testing';

import { VeramoService } from './veramo.service';

describe('VeramoService', () => {
  let service: VeramoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeramoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
