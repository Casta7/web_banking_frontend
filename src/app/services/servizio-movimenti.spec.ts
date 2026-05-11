import { TestBed } from '@angular/core/testing';

import { ServizioMovimenti } from './servizio-movimenti';

describe('ServizioMovimenti', () => {
  let service: ServizioMovimenti;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioMovimenti);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
