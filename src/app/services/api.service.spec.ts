import { TestBed, inject } from '@angular/core/testing';
import { apiService } from '../services/api.service';

describe('ListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [apiService]
    });
  });

  it('should be created', inject([apiService], (service: apiService) => {
    expect(service).toBeTruthy();
  }));
});
