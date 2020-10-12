import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo/photo';

@Component({
  selector: 'app-photos-grid',
  templateUrl: './photos-grid.component.html'
})
export class PhotosGridComponent implements OnChanges {

  rows: Photo[] = [];
  @Input() photos: Photo[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColums(this.photos);
    }
  }

  groupColums(photos: Photo[]): any[] {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
    }

    return newRows;
  }
}
