import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PaisesService } from 'src/app/paises/pages/services/paises.service';

describe('PaisesService', () => {
  let service: PaisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PaisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
