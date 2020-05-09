/** NotJustSpace Validator Checks if the value added in the input Field is not
 *  just the empty space it should have some other character in it
 */

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function notEmpty (): ValidatorFn {

  return  (control: AbstractControl): null | ValidationErrors => {

    return (control.value.trim().length > 0 ) ? null : {"Not Empty" : true} ;

  }

}
