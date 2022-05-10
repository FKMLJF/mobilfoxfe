import {AfterViewInit, Component, OnInit} from '@angular/core';
import {TokenService} from "./services/token.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'fe-package-manager';
  isLoggedIn : boolean | string | undefined;
  username?: string;
  isMenuCollapsed = true;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.check();
  }

  check(): void{
    this.isLoggedIn = this.tokenService.getToken();

    if (this.isLoggedIn) {
      this.username = this.tokenService.getUser()?.userName;
    }
  }

  logout(): void {
    this.tokenService.logOut();
    this.check();
  }

  ngAfterViewInit(): void {
    this.check();
  }
}
