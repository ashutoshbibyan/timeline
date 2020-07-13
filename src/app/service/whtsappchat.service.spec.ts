import { TestBed } from '@angular/core/testing';

import { WhtsappchatService } from './whtsappchat.service';

describe('WhtsappchatService', () => {
  let service: WhtsappchatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhtsappchatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
