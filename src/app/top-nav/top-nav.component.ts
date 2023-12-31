import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { environment } from '../environments/environment';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  public serverList = [
    {
      id: "prod",
      name: "prod"
    },
    {
      id: "dev",
      name: "dev"
    },
  ]

  public selectedEnvironment: string = 'dev';

  constructor(private router: Router, private userService: UserService, private authService: MsalService,) { }

  logout() {
    localStorage.clear();
    this.authService.logoutRedirect();
  }

  public intialRoute() {
    this.router.navigate(['']);
  }

  public openpopup() {
    this.userService.callChatopen();
  }

  public changeEnv(env: string) {
    environment.type = env;
    this.userService.sendEnvtype(env);
  }

}
