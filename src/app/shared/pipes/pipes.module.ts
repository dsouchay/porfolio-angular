import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrayFilterPipe } from './array-filter/array-filter.pipe';



@NgModule({
  declarations: [
    ArrayFilterPipe
  ],
  exports: [
    ArrayFilterPipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
