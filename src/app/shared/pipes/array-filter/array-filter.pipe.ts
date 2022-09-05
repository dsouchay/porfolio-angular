import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any[] {
    const {0: field=undefined, 1: v=undefined} = args || [];
    return value.filter( e => {
      if ( !field ) {
        return e;
      }
      let response = true;
      (!!e[field] ? response = e[field] === v : response = false );
      return response;
    } );
  }

}
