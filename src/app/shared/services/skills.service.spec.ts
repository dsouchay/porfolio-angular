import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ISkill } from '../models';

import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  let service: jasmine.SpyObj<SkillsService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SkillService', ['getSkills'] );
    TestBed.configureTestingModule({
      providers: [
        { provide: SkillsService, useValue: spy }
      ]
    });
    service = TestBed.inject(SkillsService) as jasmine.SpyObj<SkillsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it( 'should return an array of data', () => {
    const stubValue = of([
      {
        id: 'A1B2C3K4L5',
        position: 1,
        base: 80,
        mode: 'fe',
        name: 'Angular',
        skill: 'Angular'
      }
    ] as ISkill[]);
    service.getSkills.and.returnValue(stubValue);
    expect(service.getSkills())
    .withContext('service returned stub value')
    .toBe(stubValue);
  } );
});
