/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocataireService } from './locataire.service';

describe('Service: Locataire', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocataireService]
    });
  });

  it('should ...', inject([LocataireService], (service: LocataireService) => {
    expect(service).toBeTruthy();
  }));
});
