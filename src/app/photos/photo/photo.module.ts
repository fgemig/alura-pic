import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ShowIfLoggedModule } from './../../shared/directives/show-if-logged/show-if-logged.module';
import { PhotoComponent } from './photo.component';

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ShowIfLoggedModule,
    RouterModule
  ],
  exports: [PhotoComponent]
})
export class PhotoModule { }
