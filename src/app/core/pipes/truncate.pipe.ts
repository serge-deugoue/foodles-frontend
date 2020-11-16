import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, lengthLimit:number ): string {
    return value.length>= lengthLimit ? value.slice(0,lengthLimit)+"..." : value
  }

}
