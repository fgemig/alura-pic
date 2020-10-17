import { UserService } from './../../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { PhotoService } from './../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  formUpload: FormGroup;
  file: File;
  preview: string;

  constructor(
    private fb: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.formUpload = this.fb.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  upload(): void {

    const description = this.formUpload.get('description').value;
    const allowComments = this.formUpload.get('allowComments').value;

    this.photoService
      .upload(description, allowComments, this.file)
      .subscribe(() => {
        this.alertService.success('Foto cadastrada com sucesso!', true);
        this.router.navigate(['/photos/user', this.userService.getUserName()]);
      });
  }

  handleFile(file: File): void {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

  hasErrors(field: string): boolean {
    return this.formUpload.get(field).touched
      && this.formUpload.get(field).errors != null;
  }

  getErrors(field: string): ValidationErrors {
    return this.formUpload.get(field).errors;
  }
}
