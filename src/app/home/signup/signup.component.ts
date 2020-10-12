import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignUpService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

@Component({
  templateUrl: './signup.component.html',
  providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignUpService,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private router: Router) {

    this.signUpForm = this.fb.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(60)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(3),
          Validators.maxLength(30)
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
    });
  }

  ngOnInit(): void {
  }

  hasErrors(field: string): boolean {
    return this.signUpForm.get(field).touched
      && this.signUpForm.get(field).errors != null;
  }

  getErrors(field: string): ValidationErrors {
    return this.signUpForm.get(field).errors;
  }

  signup(): void {

    const newUser = this.signUpForm.getRawValue() as NewUser;

    this.signupService
      .signup(newUser)
      .subscribe(
        () => this.router.navigate(['']),
        (err) => console.log(err)
      );

  }
}
