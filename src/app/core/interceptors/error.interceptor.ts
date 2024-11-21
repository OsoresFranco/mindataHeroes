import { HttpInterceptorFn } from '@angular/common/http';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackbarService = inject(SnackbarService);

  return next(req).pipe(
    catchError((error) => {
      const errorMessage =
        error?.error?.message ||
        error?.statusText ||
        'An unknown error occurred';
      snackbarService.openSnackbar(errorMessage, 'Ok');
      return throwError(() => error);
    })
  );
};
