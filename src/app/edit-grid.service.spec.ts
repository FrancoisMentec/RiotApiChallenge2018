import { TestBed } from '@angular/core/testing';

import { EditGridService } from './edit-grid.service';

describe('EditGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditGridService = TestBed.get(EditGridService);
    expect(service).toBeTruthy();
  });
});
