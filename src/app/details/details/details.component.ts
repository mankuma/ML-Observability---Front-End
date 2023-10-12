import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from "@angular/core";
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartOptions, ChartType, registerables } from 'chart.js';

import Chart from 'chart.js/auto'
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
  fullName = '';
  public list = [
    {
      name: "Emails Received",
      count: 0,
      key: "emails_received"

    },
    {
      name: "Emails After ETL",
      count: 0,
      key: "email_after_etl"
    },
    {
      name: 'Emails Customer Branch',
      count: 0,
      key: "emails_customer_branch"
    },
    {
      name: 'Emails AM Branch',
      count: 0,
      key: "emails_am_branch"
    }
  ];

  viewData: any[] = [];

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    let route = this.router.url.split('/');
    this.routerName = route[route.length - 1];
    this.getEmailcount();
    this.tabChange('mtd');
    this.userService.helpWithchat.subscribe((res: any) => {
      if (res === true) {
        this.openPopup();
      }
    })
  }

  public getEmailcount() {
    let dataval: any[] = [];
    this.userService.getEmailcounters().subscribe((res: any) => {
      if (res['response'].length != 0) {
        let data = this.list;
        data.map((x: any) => {
          res['response'].map((y: any) => {
            if (x.key.toLowerCase() === y.name.toLowerCase()) {
              x.count = y.count === null ? 0 : y.count;
            }
          });
          dataval.push(x);
        });
        this.kpiCards = [...dataval];
      } else {
        this.kpiCards = this.list;
      }
    });
    this.callApiMethod();
  }

  public callApiMethod() {
    setTimeout((x: any) => {
      this.getEmailcount();
    }, 60000);
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

  chatbotModal: boolean = false;
  popbotModal: boolean = false;
  public chatMessages: any[] = [];
  chatMessage = "";
  actionRequired: boolean = true;
  loader: boolean = false;
  isMinimized = false;
  @ViewChild('lname', { static: false }) lname: any;


  openPopup() {
    this.displayStyle = "block";
    this.popbotModal = true;
    this.chatbotModal = false;
  }

  @ViewChild('chatContainer', { static: false }) private chatContainer: any;
  updateMessage(message: string) {
    this.lname.nativeElement.value = '';
    this.loader = true;
    this.actionRequired = false;
    let chatMessage: any = {};
    chatMessage['question'] = message;
    chatMessage['answer'] = "";
    chatMessage['id'] = Math.floor(Math.random() * 100);
    this.chatMessages.push(chatMessage);
    this.userService.getchatbot('reply').subscribe((response: any) => {
      console.log(response)
      this.actionRequired = true;
      this.loader = false;
      if (response != undefined && response != null) {
        chatMessage['answer'] = response;
        this.chatMessages.map((x: any) => {
          if (x.id === chatMessage['id']) {
            x.answer = response;
          }
        })
      }

      let element = document.getElementById('myElem');
      if (element != null) {
        element.scrollTop = element.scrollHeight;
      }
    })
    // this.reset();
    // this.scrollToBottom();

  }

  keyDownFunction(event: any) {
    if (event.keyCode === 13) {
      this.lname.nativeElement.value = ''
      this.updateMessage(this.fullName);
    }
  }

  displayStyle = "none";

  closePopup() {
    this.displayStyle = "none";
    this.popbotModal = false;
    this.chatbotModal = false;
    this.chatMessages = [];
    this.lname.nativeElement.value = ''
    this.fullName = ''
  }

  minimize() {
    this.displayStyle = "none";
    this.popbotModal = true;
    this.chatbotModal = true;
  }

}


