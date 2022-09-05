import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './pages/home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SkillsModule, AboutMeModule, WorkExperienceModule, EducationModule } from '../shared';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    SkillsModule,
    AboutMeModule,
    WorkExperienceModule,
    WorkExperienceModule,
    EducationModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
