import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {

  constructor(private router: Router, private userService: UserService) { }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  public intialRoute() {
    this.router.navigate(['']);
  }

  public openpopup() {
    this.userService.callChatopen();
  }

}
