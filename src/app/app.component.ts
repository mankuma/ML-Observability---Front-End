import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';

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
  fullName = '';

  public buttonsList = [{
    name: 'Shipping Tracking',
    arg: 'shipping',
    message: 'Please provide Shipment Tracking Id'
  },
  {
    name: 'Cart Creation',
    arg: 'cart',
    message: 'Please provide product details'
  },
  {
    name: 'Fraud Detection',
    arg: 'fraud',
    message: 'provide details to proceed ...'
  }]

  constructor(private userService: UserService) { }
  ngOnInit() {
    let obj = {
      'question': 'Hello',
      'para': 'How can i help you',
      'answer': ''
    }

    this.userService.helpWithchat.subscribe((res: any) => {
      if (res === true) {
        this.openPopup();
        this.chatMessages.push(obj);
        setTimeout((x: any) => {
          this.callIntro();
        }, 1000)

      }
    })
  }


  public callIntro() {
    let obj1 = {
      'question': 'model',
      'answer': ''
    }
    this.chatMessages.push(obj1);
  }

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
    this.userService.getchatbot(message).subscribe((response: any) => {
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

    }, err => {

      this.actionRequired = true;
      this.loader = false;

      chatMessage['answer'] = err.error.text;
      this.chatMessages.map((x: any) => {
        if (x.id === chatMessage['id']) {
          x.answer = err.error.text;
        }
      })


    })
    // this.reset();
    // this.scrollToBottom();

  }

  keyDownFunction(event: any) {
    this.updateMessage(event);
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

  public shipping(name: string) {
    let obj = {
      'question': name,
      'answer': ''
    };
    this.chatMessages.push(obj);

  }


  ngOnDestroy(): void {

  }
}