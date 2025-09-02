import { TestBed } from '@angular/core/testing';

import { CertificateViewService } from './certificate-view.service';

describe('CertificateViewService', () => {
  let service: CertificateViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
