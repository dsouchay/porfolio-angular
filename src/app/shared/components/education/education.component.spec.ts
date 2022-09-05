import { AnimationBuilder } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DirectivesModule } from '../../directives';
import { EducationService } from '../../services';

import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    const spy = { getEducations: () => of([]) } as EducationService;
    await TestBed.configureTestingModule({
      declarations: [ EducationComponent ],
      providers: [
        AnimationBuilder,
        { provide: EducationService, useValue: spy }
      ],
      imports: [
        DirectivesModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
