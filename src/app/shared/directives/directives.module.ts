import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserveVisibilityDirective } from './observe-visibility/observe-visibility.directive';



@NgModule({
  declarations: [
    ObserveVisibilityDirective
  ],
  exports: [
    ObserveVisibilityDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
