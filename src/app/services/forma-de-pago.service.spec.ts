import { TestBed } from '@angular/core/testing';

import { FormaDePagoService } from './forma-de-pago.service';

describe('FormaDePagoService', () => {
  let service: FormaDePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormaDePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
