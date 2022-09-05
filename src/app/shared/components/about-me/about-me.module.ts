import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutMeComponent } from './about-me.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    AboutMeComponent
  ],
  exports: [
    AboutMeComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class AboutMeModule { }
