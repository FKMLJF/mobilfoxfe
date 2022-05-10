import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable()
export class CanActivateUser implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    if(window.sessionStorage.getItem(environment.session_token_key) != null)
    {
      return true
    }
    else{
      return this.router.parseUrl("/login");
    }

  }
}
