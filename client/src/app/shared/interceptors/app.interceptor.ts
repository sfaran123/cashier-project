import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/internal/operators';

import { HelpersService } from 'src/app/shared/_services/generic/helpers.service';
import { NotificationService } from 'src/app/shared/_services/generic/notification.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private helpers: HelpersService, private notificationService: NotificationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const noLoader = req.headers.get('NoLoader');

    const authReq = req;

    if (noLoader) {
      return next.handle(authReq);
    }

    this.helpers.setPageSpinner(true);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notificationService.serverError();
        return throwError(error);
      }),
      finalize(() => {
        this.helpers.setPageSpinner(false);
      })
    );
  }
}
