import { PhotoService } from './photo.service';
import { Component, Input } from '@angular/core';

import { environment } from '../../../environments/environment';

const CLOUD = `${environment.apiBaseUrl}/imgs/`;
@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent {

  private _url = '';

  constructor(private photoService: PhotoService) { }

  @Input() set url(url: string) {
    if (!url.startsWith('data')) {
      this._url = `${CLOUD}/${url}`;
    } else {
      this._url = url;
    }
  }

  get url() {
    return this._url;
  }

  @Input() description = '';
  @Input() likes = 0;
  @Input() comments = 0;
  @Input() id = 0;

  like(): void {
    this.photoService.like(this.id)
      .subscribe(liked => {
        if (liked) {
          this.likes++;
        }
      });
  }
}
