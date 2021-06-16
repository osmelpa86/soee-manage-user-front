import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export class CustomValidators {
  static passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const expression = '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})';
      if (value !== null && value !== '')
        return value.match(expression) === null ? {passwordValidator: true} : null;
      else
        return null
    }
  }

  static confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
      let formGroup = <FormGroup>group;
      let control = formGroup.controls[controlName];
      let matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return null;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmPasswordValidator: true});
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    }
  }

  static onlySpacesdValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const expression = /^\s*$/;
      if (value !== null && value !== '')
        return value.match(expression) !== null ? {onlySpacesdValidator: true} : null;
      else
        return null
    }
  }
}
