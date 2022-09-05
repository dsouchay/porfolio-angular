import { AnimationBuilder } from '@angular/animations';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { of } from 'rxjs';
import { DirectivesModule } from '../../directives';
import { PipesModule } from '../../pipes';
import { SkillsService } from '../../services';

import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let component: SkillsComponent;
  let fixture: ComponentFixture<SkillsComponent>;
  let service: jasmine.SpyObj<SkillsService>;
  beforeEach(async () => {
    const spy = {getSkills: () => of([])} as SkillsService;
    await TestBed.configureTestingModule({
      declarations: [ SkillsComponent ],
      providers: [
        AnimationBuilder,
        { provide: SkillsService, useValue: spy}
      ],
      imports: [
        MatCardModule,
        MatProgressBarModule,
        DirectivesModule,
        PipesModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
