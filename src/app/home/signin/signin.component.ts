import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../../core/auth/auth.service';
import { PlatformDetectorService } from './../../core/platform/platform-detector.service';

@Component({
  templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {

  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  loginForm: FormGroup;
  invalidCredentials = false;
  authenticated = false;
  fromUrl = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlatformDetectorService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.activatedRoute.queryParams
      .subscribe(params => this.fromUrl = params.fromUrl);
  }

  login(): void {

    const userName = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => {

          this.authenticated = true;
          this.invalidCredentials = false;

          this.fromUrl !== ''
            ? this.router.navigateByUrl(this.fromUrl)
            : this.router.navigate(['photos/user', userName]);

        },
        err => {
          this.loginForm.reset();
          this.authenticated = false;
          this.invalidCredentials = true;

          this.platformDetectorService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
        }
      );
  }

  hasErrors(field: string): boolean {
    return this.loginForm.get(field).touched
      && this.loginForm.get(field).errors?.required;
  }
}

