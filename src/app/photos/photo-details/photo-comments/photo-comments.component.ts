import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';

import { PhotoComment } from '../../photo/photo-comment';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

  @Input() id: number;
  commentsForm: FormGroup;
  comments$: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private fb: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit(): void {

    this.comments$ = this.photoService
      .getComments(this.id);

    this.commentsForm = this.fb.group({
      comment: ['', [Validators.required, Validators.maxLength(300)]]
    });
  }

  save(): void {

    const comment = this.commentsForm.get('comment').value as string;

    this.comments$ = this.photoService
      .addComment(this.id, comment)
      .pipe(switchMap(() => this.photoService.getComments(this.id)))
      .pipe(tap(() => this.commentsForm.reset()))
      .pipe(catchError((err) => {
        if (err.status === 401) {
          of(this.alertService.danger('Efetue o login para comentar!'));
        }
        return throwError(err);
      }));

  }

  hasErrors(field: string): boolean {
    return this.commentsForm.get(field).touched
      && this.commentsForm.get(field).errors != null;
  }

  getErrors(field: string): ValidationErrors {
    return this.commentsForm.get(field).errors;
  }
}
