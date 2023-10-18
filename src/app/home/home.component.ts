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

  accordianValues = [{
    projectName: 'AMANADA',
    modelName: 'Model 1',
    replicas: '0/1',
    CPU: 0,
    Memory: '3 GB',
    createdBy: 'allarak',
    lastDeployed: '10/10/2023',
    status: 'In Progress'
  },
  {
    projectName: 'PROPENSITY',
    modelName: 'Model Propensity',
    replicas: '1/1',
    CPU: 2,
    Memory: '5 GB',
    createdBy: 'williams',
    lastDeployed: '02/10/2023',
    status: 'Building'
  },
  {
    projectName: 'SUPPLY AND DEMAND',
    modelName: 'Model 2',
    replicas: '2/5',
    CPU: 4,
    Memory: '2 GB',
    createdBy: 'tom',
    lastDeployed: '14/09/2022',
    status: 'Stopped'
  }];

  accordianObj: any[] = [];

  models: any[] = [{
    'name': 'Model 1',
    'status': "In Progress",
    "replica": "10 / 20",
    "cpu": "2",
    "memory": "16 GB",
    "createdBy": "allarak",
    "deployedOn": "10/10/2023"
  },
  {
    'name': 'Model 2',
    'status': "Running",
    "replica": "5 / 10",
    "cpu": "2",
    "memory": "6 GB",
    "createdBy": "will",
    "deployedOn": "18/10/2022"
  }]

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

  public expandAcc(num: number, name: string) {
    if (this.selectedRow != num) {
      this.accordianObj = this.accordianValues.filter(x => x.projectName === name);
      this.selectedRow = num;

    } else {
      this.selectedRow = -1;
    }

  }

}



