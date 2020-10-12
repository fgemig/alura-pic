import { NgModule } from '@angular/core';

import { PhotoFormModule } from './photo-form/photo.form.module';
import { PhotosListModule } from './photo-list/photo-list.module';
import { PhotoModule } from './photo/photo.module';

@NgModule({
  imports: [
    PhotoModule,
    PhotoFormModule,
    PhotosListModule
  ]
})
export class PhotosModule { }
