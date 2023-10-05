import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-amanada-home',
  templateUrl: './amanada-home.component.html',
  styleUrls: ['./amanada-home.component.css']
})
export class AmanadaHomeComponent {
  public kpiCards = [
    {
      name: "Dashboards",
      count: 10
    },
    {
      name: "Viewed Dashboards",
      count: 4
    },
    {
      name: 'Dashboards in Live',
      count: 8
    },
    {
      name: 'Dashboards in Development',
      count: 2
    }
  ];

  public list: any[] = [];

  constructor(private userService: UserService) {

  }
  ngOnInit() {
    this.userService.gettoptenamwisecartdetails().subscribe((response: any) => {
      this.list = response.response
    });
  }
}
