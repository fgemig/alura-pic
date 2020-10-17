import { NgModule } from '@angular/core';

import { PhotoDetailsModule } from './photo-details/photo-details.module';
import { PhotoFormModule } from './photo-form/photo.form.module';
import { PhotosListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotosListModule,
    PhotoDetailsModule
  ]
})
export class PhotosModule { }
