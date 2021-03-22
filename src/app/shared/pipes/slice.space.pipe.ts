import { Pipe, PipeTransform } from '@angular/core';
/*
* It will return the word before space.
* ex . Input = Amit Jaiswal
* o/p :  Amit
*/
@Pipe({name: 'SliceBeforSpace'})
export class SliceBeforSpace implements PipeTransform {
  transform(input: string): string {
      let index = input.trim().indexOf( " " );
    return input.trim().slice(0, index);
  }
}
