import { TestBed } from '@angular/core/testing';

import { IngridientsService } from './ingridients.service';

describe('IngridientsService', () => {
  let service: IngridientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngridientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
