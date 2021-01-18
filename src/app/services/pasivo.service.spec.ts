import { TestBed } from '@angular/core/testing';

import { PasivoService } from './pasivo.service';

describe('PasivoService', () => {
  let service: PasivoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasivoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
