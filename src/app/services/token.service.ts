import {Injectable} from '@angular/core';
import {UserDto} from "../dto-models/user-dto.model";
import {environment} from "../../environments/environment";
import {LoginDto} from "../dto-models/login-dto.model";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() {
  }

  public logOut(): void {
    window.sessionStorage.removeItem(environment.session_token_key);
    window.sessionStorage.removeItem(environment.session_user_key);
  }

  public getToken(): string | boolean {
    return window.sessionStorage.getItem(environment.session_token_key) ?? false;
  }

  public getRemember(): LoginDto | null {
    const user = window.sessionStorage.getItem(environment.remember_key);

    if (user) {
      return new LoginDto(JSON.parse(user));
    } else {
      return null;
    }
  }

  public setRemember(authenticatedUser : LoginDto = new LoginDto(null), reset: boolean = false): void {
    if(reset){
      window.sessionStorage.removeItem(environment.remember_key);
    }else{
      window.sessionStorage.setItem(environment.remember_key, JSON.stringify(authenticatedUser));
    }
  }

  public setToken(token: string): void {
    window.sessionStorage.setItem(environment.session_token_key, token);
  }

  public getUser(): UserDto | null {
    const user = window.sessionStorage.getItem(environment.session_user_key);

    if (user) {
      return new UserDto(JSON.parse(user));
    } else {
      return null;
    }
  }

  public setUser(user: UserDto): void {
    window.sessionStorage.setItem(environment.session_user_key, JSON.stringify(user));
  }

}
