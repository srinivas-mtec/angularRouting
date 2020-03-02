import { TestBed } from '@angular/core/testing';

import { TestserviceService } from './testservice.service';
import { inject } from '@angular/core';

describe('TestserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestserviceService = TestBed.get(TestserviceService);
    expect(service).toBeTruthy();
  });

  it('check method',()=>{
    const service: TestserviceService = TestBed.get(TestserviceService);
    expect(service.add).toBeTruthy();
  });
}); 
