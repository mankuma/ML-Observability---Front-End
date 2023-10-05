import { Component, OnInit } from "@angular/core";
import { UserService } from "../user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  userData: any;
  constructor(private user: UserService) { }

  ngOnInit() {
    this.user.currentUserData.subscribe(userData => (this.userData = userData));
    this.userData.email = 'mlobservability@cdw.com';
    this.userData.password = 'MLops@2023';
  }

  changeData(event: any) {
    var msg = event.target.value;
    this.user.changeData(msg);
  }
  login(data: any) {
    this.user.changeData(data);
  }
}