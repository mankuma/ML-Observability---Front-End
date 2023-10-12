import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userUtilization: boolean = true;
  activeProjects: boolean = true;

  public kpiUtlization = [
    {
      name: "CPU",
      count: '50%',
      background: '#ffffff'
    },
    {
      name: "Memory",
      count: '88%',
      background: '#ffffff'
    }]

  public kpiCards = [
    {
      name: 'Projects',
      count: 3,
      background: '#ffffff'
    },
    {
      name: "Models",
      count: 4,
      background: '#ffffff'
    },
    {
      name: "Experiments",
      count: 3,
      background: '#ffffff'
    },
    {
      name: "Jobs",
      count: 3,
      background: '#ffffff'
    },

  ];

  public list = [{
    name: 'AMANADA',
    issues: 1,
    performance: 'In progress',
    drift: '32 GB',
    quality: 5,
    volume: '15,00,000',
    url: '/details/amanada_details',
    createdBy: 'Williams',
    updatedOn: '09/09/2013'
  },
  {
    name: 'PROPENSITY',
    issues: 4,
    performance: 'Stopped',
    drift: '8 GB',
    quality: 8,
    volume: '75,00,000',
    url: '/details/propensity_details',
    createdBy: 'Tom',
    updatedOn: '10/07/2019'
  },
  {
    name: 'SUPPLY AND DEMAND',
    issues: 8,
    performance: 'In progress',
    drift: '16 GB',
    quality: 4,
    volume: '7,00,000',
    url: '/details/supplydemand_details',
    createdBy: 'Dav',
    updatedOn: '10/08/2023'
  }];

  public selectedRow: number = -1;

  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit() {
    // this.userService.checkResponse().subscribe((res: any) => {

    // })
  }

  navigateTodetails(name: string) {
    this.router.navigate([name]);
  }

  public openUtilization() {
    this.userUtilization = this.userUtilization === true ? false : true;
  }

  public openActive() {
    this.activeProjects = this.activeProjects === true ? false : true;
  }

  public expandAcc(num: number) {
    if (this.selectedRow != num) {
      this.selectedRow = num;
    } else {
      this.selectedRow = -1;
    }

  }

}



