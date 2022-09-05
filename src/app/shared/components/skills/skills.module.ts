import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes';
import { SkillsComponent } from './skills.component';



@NgModule({
  declarations: [
    SkillsComponent
  ],
  exports: [
    SkillsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule,
    DirectivesModule,
    PipesModule
  ]
})
export class SkillsModule { }
