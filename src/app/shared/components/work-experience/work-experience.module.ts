import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkExperienceComponent } from './work-experience.component';



@NgModule({
  declarations: [
    WorkExperienceComponent
  ],
  exports: [
    WorkExperienceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorkExperienceModule { }
