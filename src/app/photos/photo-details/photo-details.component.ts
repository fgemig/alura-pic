import { UserService } from './../../core/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { AlertService } from './../../shared/alert/alert.service';
import { PhotoService } from './../photo/photo.service';

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params.id;

    this.photo$ = this.photoService
      .findById(id);

    this.photo$
      .subscribe(
        () => { },
        err => this.router.navigate(['not-found'])
      );
  }

  remove(id: number): void {
    this.photoService.removePhoto(id)
      .subscribe(
        () => {
          this.alertService.success('Foto excluída!', true);
          this.router.navigate(['/photos/user', this.userService.getUserName()], { replaceUrl: true });
        },
        (err) => this.alertService.success('Erro ao excluir a foto!')
      );
  }
}
