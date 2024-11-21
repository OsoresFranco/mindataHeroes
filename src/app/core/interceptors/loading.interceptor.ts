import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  console.log('Sucedi - Request started');
  spinnerService.show();

  return next(req).pipe(
    tap({
      next: () => console.log('Sucedi - Request succeeded'),
      error: (err) => console.log('Sucedi - Request failed', err),
    }),
    finalize(() => {
      setTimeout(() => {
        spinnerService.hide();
      }, 1000);
    })
  );
};
