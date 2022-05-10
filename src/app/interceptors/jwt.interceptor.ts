import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenService} from "../services/token.service";
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private token: TokenService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let cloneRequest = request;
    const token = this.token.getToken();

    if (token != null) {
      cloneRequest = request.clone({headers: request.headers.set(environment.header_token_key, "Bearer "+token)});
      cloneRequest.headers.append("Content-Type", "application/json");
      cloneRequest.headers.append("Access-Control-Allow-Origin", "*");
    }

    return next.handle(cloneRequest);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
];
