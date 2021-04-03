import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        'x-rapidapi-key': 'f87316e290mshc612b2d7bf857b4p1444f1jsnd0bf06386044',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
      }
    });

    return next.handle(request);
  }
}
