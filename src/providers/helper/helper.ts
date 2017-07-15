import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HelperProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class HelperProvider {

  constructor() {
    
  }

  public static guid = (): string => {
        return HelperProvider.s4() + HelperProvider.s4() + '-' + HelperProvider.s4() + '-' + HelperProvider.s4() + '-' +
            HelperProvider.s4() + '-' + HelperProvider.s4() + HelperProvider.s4() + HelperProvider.s4();
    }

    /**
     * Generates a random string
     * @returns A random string
     */
    private static s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

}
