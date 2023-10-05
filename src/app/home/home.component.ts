import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public kpiCards = [
    {
      name: "Models Live",
      para: 'Seen in last 24 hours',
      count: 0,
      // background: '#c6c7f8',
      background: '#ffffff'
    },
    {
      name: "Prediction Volume",
      para: 'Seen in last 24 hours',
      count: '17,641',
      //background: '#baedbd'
      background: '#ffffff'
    },
    {
      name: 'Model Versions Live',
      para: 'Seen in last 24 hours',
      count: 1,
      //background: '#b5bffd'
      background: '#ffffff'
    }
  ];

  public list = [{
    name: 'AMANADA',
    issues: 1,
    performance: 'Inprogress',
    drift: '32 GB',
    quality: 5,
    volume: '15,00,000',
    url: '/details/amanada_details'
  },
  {
    name: 'PROPENSITY',
    issues: 4,
    performance: 'Stopped',
    drift: '8 GB',
    quality: 8,
    volume: '75,00,000',
    url: '/details/propensity_details'
  },
  {
    name: 'SUPPLY AND DEMAND',
    issues: 8,
    performance: 'Inprogress',
    drift: '16 GB',
    quality: 4,
    volume: '7,00,000',
    url: '/details/supplydemand_details'
  }];

  constructor(private userService: UserService, private router: Router) {

  }
  ngOnInit() {
    // this.userService.callUserDetails().subscribe((response: any) => {
    //   console.log(response);
    // });

    // fetch('https://hdfnifidevvh1.corp.cdw.com:9091/nifi-api/counters').then((data) => {
    //   console.log(data);
    // }).catch()
  }

  navigateTodetails(name: string) {
    this.router.navigate([name]);
  }

}



