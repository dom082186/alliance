import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'key',
  pure: false,
})
export class KeyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
 

   transform(map: { [key: string]: any }, ...parameters: any[]) {
        if (!map)
            return undefined;
        return Object.keys(map)
            .map((key) => ({ 'key': key, 'value': map[key] }));
    }

}
