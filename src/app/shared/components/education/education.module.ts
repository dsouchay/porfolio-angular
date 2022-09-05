import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationComponent } from './education.component';
import { MatCardModule } from '@angular/material/card';
import { DirectivesModule } from '../../directives';



@NgModule({
  declarations: [
    EducationComponent
  ],
  exports: [
    EducationComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    DirectivesModule
  ]
})
export class EducationModule { }
