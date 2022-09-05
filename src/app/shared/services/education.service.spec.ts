import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IEducation } from '../models';

import { EducationService } from './education.service';

describe('EducationService', () => {
  let service: jasmine.SpyObj<EducationService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('EducationService', ['getEducations'] );
    TestBed.configureTestingModule({
      providers: [
        { provide: EducationService, useValue: spy }
      ]
    });
    service = TestBed.inject(EducationService) as jasmine.SpyObj<EducationService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'should return an array of data', () => {
    const stubValue = of([
      {
        id: 'A1B2C3K4L5',
        position: 1,
        period: 'Lorem ipsum',
        title: 'Lorem ipsum',
        info: {
          title: 'Lorem ipsum',
          location: 'Lorem ipsum',
          data: []
        }
      }
    ] as IEducation[]);
    service.getEducations.and.returnValue(stubValue);
    expect(service.getEducations())
    .withContext('service returned stub value')
    .toBe(stubValue);
  } );
});
