import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";

@Directive({
    selector:'[appPasswordValidator]',
    providers:[{
        provide:NG_VALIDATORS,
        useExisting:PasswordDirective,
        multi:true
    }]
})
export class PasswordDirective implements Validator{
    @Input()  appPasswordValidator:string;
  validate(control:AbstractControl):{[key:string]:any}|null{
    const passwordControl = control.parent.get(this.appPasswordValidator);
    const confirmPasswordControl = control;

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      return { notEqual: true };
    }

    return null;
  }
}