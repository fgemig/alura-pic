import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DarkenOnHoverModule } from './../../shared/directives/darken-on-hover/darken-on-hover.module';
import { PhotoModule } from './../photo/photo.module';
import { FilterByDescription } from './filter-by-description.pipe';
import { LoadButtonComponent } from './load-button/load-button.component';
import { PhotoListComponent } from './photo-list.component';
import { PhotoSearchComponent } from './photo-search/photo-search.component';
import { PhotosGridComponent } from './photos-grid/photos-grid.component';

@NgModule({
  declarations: [
    PhotoListComponent,
    FilterByDescription,
    PhotosGridComponent,
    LoadButtonComponent,
    PhotoSearchComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    DarkenOnHoverModule,
    RouterModule
  ]
})
export class PhotosListModule { }
