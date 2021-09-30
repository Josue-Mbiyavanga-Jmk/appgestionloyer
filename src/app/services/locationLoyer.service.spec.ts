/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationLoyerService } from './locationLoyer.service';

describe('Service: LocationLoyer', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationLoyerService]
    });
  });

  it('should ...', inject([LocationLoyerService], (service: LocationLoyerService) => {
    expect(service).toBeTruthy();
  }));
});
