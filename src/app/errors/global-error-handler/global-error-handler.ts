import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import * as StackTrace from 'stacktrace-js';

import { UserService } from './../../core/user/user.service';
import { ServerLogService } from './server-log-service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router  = this.injector.get(Router);

    const url = location instanceof PathLocationStrategy
      ? location.path()
      : '';

    const userName = userService.getUserName();

    const message = error.message ? error.message : error.toString();

    router.navigate(['error']);

    StackTrace
      .fromError(error)
      .then(stackFrames => {

        const stack = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        serverLogService.log({ message, url, userName, stack })
          .subscribe(() => {
            console.log('Error logged on server!');
          });
      });
  }
}
