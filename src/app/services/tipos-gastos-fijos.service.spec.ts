import { TestBed } from '@angular/core/testing';

import { TiposGastosFijosService } from './tipos-gastos-fijos.service';

describe('TiposGastosFijosService', () => {
  let service: TiposGastosFijosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposGastosFijosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
