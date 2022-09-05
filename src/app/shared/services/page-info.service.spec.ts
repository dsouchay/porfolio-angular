import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IPage } from '../models';

import { PageInfoService } from './page-info.service';

describe('PageInfoService', () => {
  let service: jasmine.SpyObj<PageInfoService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('PageInfoService', ['getPageInfo'] );
    TestBed.configureTestingModule({
      providers: [
        { provide: PageInfoService, useValue: spy }
      ]
    });
    service = TestBed.inject(PageInfoService) as jasmine.SpyObj<PageInfoService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'should return an array of data', () => {
    const stubValue = of([
      {
        id: 'A1B2C3K4L5',
        about: ['Lorem ipsum dolor sit amet consectetur adipisicing elit.'],
        about_text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate reprehenderit mollitia rerum veritatis? Iure magni quam dolorem sit velit? Officia eos nesciunt id? Optio rem voluptatibus pariatur quam aperiam adipisci.',
        basic_information: [{label: 'Lorem ipsum dolor', value: 'Lorem ipsum dolor'}],
        footer: 'Lorem ipsum dolor',
        rrss: [{icon: 'afg-1', info: 'Lorem ipsum dolor', position: 1, url: 'http://www.google.es', color: 'primary'}],
        title: 'afiugud',
        work_experience: [{company: 'WebFG', info: ['Lorem ipsum dolor'], period: '2020-2022', position: 1}]
      }
    ] as IPage[]);
    service.getPageInfo.and.returnValue(stubValue);
    expect(service.getPageInfo())
    .withContext('service returned stub value')
    .toBe(stubValue);
  } );
});
