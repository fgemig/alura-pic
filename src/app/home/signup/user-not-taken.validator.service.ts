import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { debounceTime, first, map, switchMap } from 'rxjs/operators';

import { SignUpService } from './signup.service';

@Injectable()
export class UserNotTakenValidatorService {

  constructor(private signUpService: SignUpService) { }

  checkUserNameTaken(): any {
    return (control: AbstractControl) => {
      return control
        .valueChanges
        .pipe(debounceTime(500))
        .pipe(switchMap((userName: string) =>
          this.signUpService.checkUserNameTaken(userName)
        ))
        .pipe(
          map(
            isTaken => isTaken ? { userNameTaken: true } : null))
        .pipe(first());
    };
  }
}
