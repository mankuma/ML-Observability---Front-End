import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';

import Chart from 'chart.js/auto'
import { forkJoin } from "rxjs";
import { UserService } from 'src/app/user.service';
Chart.register(...registerables);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  data = [];
  routerName: string = '';
  public kpiCards: any[] = [];
  public selectedTab: string = '';
  public selectedCounter: string = 'shipment';

  public list = [
    {
      name: "Emails Received",
      count: 0,
      fullcount: 0,
      key: "emails_received"

    },
    {
      name: "Emails Processed",
      count: 0,
      fullcount: 0,
      key: "email_after_etl"
    },
    {
      name: 'Emails Customer Branch',
      count: 0,
      fullcount: 0,
      key: "emails_customer_branch"
    },
    {
      name: 'Emails AM Branch',
      count: 0,
      fullcount: 0,
      key: "emails_am_branch"
    },
  ];

  emailQuotes = [
    {
      name: 'Emails Customer Quotes',
      count: 0,
      fullcount: 0,
      key: "emails_quote_ct"
    },
    {
      name: 'Emails AM Quotes',
      count: 0,
      fullcount: 0,
      key: "emails_quote_am"
    },
  ];

  emailShipments = [
    {
      name: 'Emails Customer Shipments',
      count: 0,
      fullcount: 0,
      key: "emails_shipment_ct"
    },
    {
      name: 'Emails AM Shipment',
      count: 0,
      fullcount: 0,
      key: "emails_shipment_am"
    }
  ];

  emailFrauds = [
    {
      name: 'Emails Customer Fraud',
      count: 5,
      fullcount: 20,
      key: ""
    }
  ]

  viewData: any[] = [];
  bindCounters: any[] = [];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    let route = this.router.url.split('/');
    this.routerName = route[route.length - 1];
    this.getEmailcount();

    this.userService.convertEnvmode.subscribe((res: any) => {
      if (res != '' && res != null && res != undefined) {
        let arg = this.selectedTab === '' ? 'mtd' : this.selectedTab;
        this.tabChange(arg);
      } else {
        this.tabChange('mtd');
      }
    })
  }

  public getEmailcount() {
    let dataval: any[] = [];

    let api1 = this.userService.getEmailcounters();
    let api2 = this.userService.getEmailcounterstotal();
    forkJoin([api1, api2]).subscribe(([result1, result2]: any) => {
      let data = this.list;
      if (result1['response'].length != 0) {
        result1.response.map((x: any) => x.time = 15)
      }
      if (result2['response'].length != 0) {
        result2.response.map((x: any) => x.time = 24)
      }
      let values = [...result1['response'], ...result2['response']];
      data.map((res: any) => {
        let dup = values.filter(k => k.name.toLowerCase() === res.key.toLowerCase());
        if (dup.length != 0) {
          let arr1 = dup.filter(k => k.time === 15);
          let arr2 = dup.filter(k => k.time === 24);
          res['count'] = arr1.length != 0 ? arr1[0]['count'] : 0;
          res['fullcount'] = arr2.length != 0 ? arr2[0]['count'] : 0;
        }
        dataval.push(res);
      });
      this.emailShipments.map((x: any) => {
        let dup = values.filter(k => k.name.toLowerCase() === x.key.toLowerCase());
        let arr1 = dup.filter(k => k.time === 15);
        let arr2 = dup.filter(k => k.time === 24);
        x['count'] = arr1.length != 0 ? arr1[0]['count'] : 0;
        x['fullcount'] = arr2.length != 0 ? arr2[0]['count'] : 0;
      });
      this.emailQuotes.map((x: any) => {
        let dup = values.filter(k => k.name.toLowerCase() === x.key.toLowerCase());
        let arr1 = dup.filter(k => k.time === 15);
        let arr2 = dup.filter(k => k.time === 24);
        x['count'] = arr1.length != 0 ? arr1[0]['count'] : 0;
        x['fullcount'] = arr2.length != 0 ? arr2[0]['count'] : 0;
      });
      this.kpiCards = [...dataval];
      this.tab(this.selectedCounter);

    });

    this.callApiMethod();
  }

  public callApiMethod() {
    setTimeout((x: any) => {
      this.getEmailcount();
    }, 900000);
  }

  public intialLoad() {
    const mixedChart = new Chart('myChart', {
      data: {
        datasets: [{
          type: 'bar',
          label: 'Cores',
          data: [10, 20, 30, 40]
        }],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    const mixedCha = new Chart('myChart1', {
      data: {
        datasets: [{
          type: 'line',
          label: 'GB',
          data: [10, 30, 15, 50],
        }],
        labels: ['January', 'February', 'March', 'April']
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  generatedCarts() {
    const monthWisecart: any = {};
    this.userService.monthwiseCart(this.selectedTab).subscribe((x: any) => {
      monthWisecart['xlabels'] = x.response.map((y: any) => this.selectedTab === 'mtd' ? y.cartdate.split('T')[0] : y.month);
      monthWisecart['totalcart'] = x.response.map((y: any) => y.totalcart);
      monthWisecart['totalavg'] = x.response.map((y: any) => y.totalavg);
      monthWisecart['label1'] = "Generated Carts";
      monthWisecart['label2'] = "Average Cart Value";
      monthWisecart['heading'] = 'Generated Carts';
      this.viewData.push(monthWisecart);
      this.convertedCarts();
    });

  };
  convertedCarts() {
    const monthWisecart: any = {};
    this.userService.getMonthWiseOrderConverted(this.selectedTab).subscribe((x: any) => {
      monthWisecart['xlabels'] = x.response.map((y: any) => this.selectedTab === 'mtd' ? y.cartdate.split('T')[0] : y.month);
      monthWisecart['totalcart'] = x.response.map((y: any) => y.totalcart);
      monthWisecart['totalavg'] = x.response.map((y: any) => y.totalavg);
      monthWisecart['label1'] = "Converted Carts";
      monthWisecart['label2'] = "Average Cart Value";
      monthWisecart['heading'] = 'Converted Carts';
      this.viewData.push(monthWisecart);
      this.notconvertedCarts();
    });

  }
  notconvertedCarts() {
    const monthWisecart: any = {};
    this.userService.getMonthWiseOrderNotConverted(this.selectedTab).subscribe((response: any) => {
      monthWisecart['xlabels'] = response.response.map((y: any) => this.selectedTab === 'mtd' ? y.cartdate.split('T')[0] : y.month);
      monthWisecart['totalcart'] = response.response.map((y: any) => y.totalcart);
      monthWisecart['totalavg'] = response.response.map((y: any) => y.ordernotconvertedavg);
      monthWisecart['label1'] = "Non Converted Carts";
      monthWisecart['label2'] = "Average Cart Value";
      monthWisecart['heading'] = 'Non Converted Carts';
      this.viewData.push(monthWisecart);
      this.cancelledCarts();
    })

  }
  cancelledCarts() {
    const monthWisecart: any = {};
    this.userService.getMonthWiseOrderCancel(this.selectedTab).subscribe((response: any) => {
      monthWisecart['xlabels'] = response.response.map((y: any) => this.selectedTab === 'mtd' ? y.cartdate.split('T')[0] : y.month);
      monthWisecart['totalcart'] = response.response.map((y: any) => y.totalcart);
      monthWisecart['totalavg'] = response.response.map((y: any) => y.totalavg);
      monthWisecart['label1'] = "Cancelled Carts";
      monthWisecart['label2'] = "Average Cart Value";
      monthWisecart['heading'] = 'Cancelled Carts';
      this.viewData.push(monthWisecart);
    })

  }

  public tabChange(tabName: string) {
    this.selectedTab = tabName;
    this.viewData = [];
    let route = this.router.url.split('/');
    if (route[route.length - 1] === 'amanada_details') {
      this.generatedCarts();
    } else {
      setTimeout((x: any) => {
        this.intialLoad();
      })

    }
  }

  public tab(name: string) {
    this.selectedCounter = name;
    if (name === 'shipment') {
      this.bindCounters = [...this.emailShipments];
    } else if (name === 'quote') {
      this.bindCounters = [...this.emailQuotes];
    } else {
      this.bindCounters = [...this.emailFrauds];
    }
  }






}


