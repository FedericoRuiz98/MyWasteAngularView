import { TestBed } from '@angular/core/testing';

import { CategoriaSubCategoriaService } from './categoria-sub-categoria.service';

describe('CategoriaSubCategoriaService', () => {
  let service: CategoriaSubCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaSubCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
