import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, mergeMap, retry, retryWhen } from 'rxjs/operators';

export const maxRetries = 3;
export const delayMs = 2000

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retryWhen((error) =>{
        return error.pipe(
          mergeMap((error, index)=>{
            if(index < maxRetries && error.status == 500){
              return of(error).pipe(delay(delayMs));
            }
            throw error;
          })
        )
      })
    )
  }

};
