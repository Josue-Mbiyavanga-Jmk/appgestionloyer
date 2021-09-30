/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ChargeService } from './charge.service';

describe('Service: Charge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChargeService]
    });
  });

  it('should ...', inject([ChargeService], (service: ChargeService) => {
    expect(service).toBeTruthy();
  }));
});
