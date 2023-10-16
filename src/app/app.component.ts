import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { ServerError } from '@azure/msal-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  chatbotModal: boolean = false;
  popbotModal: boolean = false;
  public chatMessages: any[] = [];
  chatMessage = "";
  actionRequired: boolean = true;
  loader: boolean = false;
  isMinimized = false;
  @ViewChild('lname', { static: false }) lname: any;
  @ViewChild('chatContainer', { static: false }) private chatContainer: any;

  fullName = '';
  displayStyle = "none";
  type: string = '';

  public buttonsList = [
    {
      name: 'Shipment Tracking',
      arg: 'shipment',
      message: 'Please provide Shipment Tracking Id'
    },
    {
      name: 'Cart Creation',
      arg: 'cart',
      message: ''
    },
    {
      name: 'Fraud Detection',
      arg: 'fraud',
      message: 'provide details to proceed ...'
    }]

  public cart_List = [
    {
      name: 'Product - 1',
      arg: 'shipment',
      message: 'Product - 1'
    },
    {
      name: 'Product - 2',
      arg: 'cart',
      message: 'Product - 1'
    },
    {
      name: 'Product - 3',
      arg: 'fraud',
      message: 'Product - 1'
    }]

  constructor(private userService: UserService) { }

  ngOnInit() {
    let obj = {
      'system': 'Hello',
      'para': 'I am AVA',
    }

    this.userService.helpWithchat.subscribe((res: any) => {
      if (res === true) {
        this.openPopup();
        this.chatMessages.push(obj);
        setTimeout((x: any) => {
          this.callIntro('model');
        }, 1000)
      }
    })
  }

  public callIntro(name: string) {
    let obj = {
      'system': name,
    }
    this.chatMessages.push(obj);
  }

  openPopup() {
    this.displayStyle = "block";
    this.popbotModal = true;
    this.chatbotModal = false;
  }

  updateMessage(message: string) {
    this.lname.nativeElement.value = '';
    this.loader = true;
    this.actionRequired = false;
    let chatMessage: any = {};
    chatMessage['user'] = message;
    this.chatMessages.push(chatMessage);
    this.userService.getchatbot(this.concatenate(this.type, message), message).subscribe((response: any) => {
      this.actionRequired = true;
      this.loader = false;
      if (response != undefined && response != null) {
        let serveMessage: any = {};
        serveMessage['system'] = response;
        this.chatMessages.push(serveMessage);
      }
      setTimeout((x: any) => {
        this.callIntro('model');
      }, 1000)

    }, err => {

      this.actionRequired = true;
      this.loader = false;

      chatMessage['user'] = err.error.text;
      this.chatMessages.map((x: any) => {
        if (x.id === chatMessage['id']) {
          x.user = err.error.text;
        }
      })
    })
  }

  keyDownFunction(event: any) {
    this.updateMessage(event);
  }

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

  public shipping(name: string, type: string) {
    this.type = type;
    if (this.type === 'cart')
      this.callIntro('cart')
    else {
      let cart = {
        'system': name,
        'user': ''
      };
      this.chatMessages.push(cart);
    }
  }

  ngOnDestroy(): void {
  }

  public concatenate(type: string, message: string) {
    switch (type) {
      case 'shipment':
        return 'Plese provide shipment tracking details of ' + message;
      case 'cart':
        return 'Add ' + message + 'to cart';
      case 'fraud':
        return 'please provide fraud detection id' + message;
      default:
        return '';
    }

  }
}