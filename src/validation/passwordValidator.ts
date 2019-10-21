import { ValidatorFn, Validator, FormControl, NG_VALIDATORS, ValidationErrors, Validators } from "@angular/forms"
import { Directive } from '@angular/core';

@Directive({  
    selector: '[passwordValidator]',  
    providers: [  
     {  
      provide: NG_VALIDATORS,  
      useExisting: PasswordValidator,  
      multi: true  
     }  
    ]  
   }) 

export class PasswordValidator implements Validator{
    
    validate(control: FormControl): ValidationErrors | null {
        console.log('validat:'+JSON.stringify(PasswordValidator.passwordValidator(control)));
        return PasswordValidator.passwordValidator(control);
    }
    static passwordValidator(control: FormControl): ValidationErrors {

            let value: string = control.value || '';
            let errors = [];
            
            if (!value) {
                return  Validators.required;
            }
            

            console.log('val2:'+value);
            if(value.length < 8) {
                errors.push( `password require length 8` );
            }

            let upperCaseCharacters = /[A-Z]+/g;
            if (upperCaseCharacters.test(value) === false) {
                errors.push( `one Upper case character` );
            }

            let lowerCaseCharacters = /[a-z]+/g;
            if (lowerCaseCharacters.test(value) === false) {
                errors.push( `one lower case character` );
            }


            let numberCharacters = /[0-9]+/g;
            if (numberCharacters.test(value) === false) {
                errors.push( `one number character` );
            }

            let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (specialCharacters.test(value) === false) {
                errors.push( `one special character` );
            }
            if(errors.length == 0)
                return Validators.required;
            return  { passwordValidator: errors };
        }
  
        static passwordCheck(value: string) {

            let errors = [];
            
            if (!value) {
                return  errors;
            }
            

            console.log('val2:'+value);
            if(value.length < 8) {
                errors.push( `password require length 8` );
            }

            let upperCaseCharacters = /[A-Z]+/g;
            if (upperCaseCharacters.test(value) === false) {
                errors.push( `one Upper case character` );
            }

            let lowerCaseCharacters = /[a-z]+/g;
            if (lowerCaseCharacters.test(value) === false) {
                errors.push( `one lower case character` );
            }


            let numberCharacters = /[0-9]+/g;
            if (numberCharacters.test(value) === false) {
                errors.push( `one number character` );
            }

            let specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            if (specialCharacters.test(value) === false) {
                errors.push( `one special character` );
            }
            return errors;
        }
  
}