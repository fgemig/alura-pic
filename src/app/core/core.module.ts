import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ValidateInputComponent } from '../shared/validate-input/validate-input.component';
import { AlertModule } from './../shared/alert/alert.module';
import { RequestInterceptor } from './auth/request.interceptor';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ValidateInputComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AlertModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ValidateInputComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RequestInterceptor,
    multi: true
  }]
})
export class CoreModule { }
