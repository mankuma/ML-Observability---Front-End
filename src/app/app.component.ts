import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UserService } from './user.service';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus, PopupRequest, RedirectRequest, ServerError } from '@azure/msal-browser';
import { MSAL_GUARD_CONFIG, MsalBroadcastService, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Subject, filter, forkJoin, takeUntil } from 'rxjs';
import { environment } from './environments/environment';

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

  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

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
      isChecked: false,
      message: 'Product - 1'
    },
    {
      name: 'Product - 2',
      isChecked: false,
      message: 'Product - 2'
    },
    {
      name: 'Product - 3',
      isChecked: false,
      message: 'Product - 3'
    }]


  constructor(private userService: UserService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService) { }

  ngOnInit() {
    this.login();
    let obj = {
      'system': 'Hello',
      'para': 'I am AVA',
      'para1': 'How can i help Today'
    }

    this.userService.helpWithchat.subscribe((res: any) => {
      if (res === true) {
        this.openPopup();
        this.chatMessages.push(obj);
      }
    })
  }

  login() {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal
    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED),
      )
      .subscribe((result: EventMessage) => {
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = "/";
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      })
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
    this.callModelapi(message);
  }

  callModelapi(message: string) {
    let quoteAccess = { "accessKey": environment.quoteAccesskey, "request": { "email_body": message } }
    let shipmentAccess = { "accessKey": environment.shipmentAccesskey, "request": { "email_body": message } }
    let res = this.userService.modelResponse(quoteAccess);
    let res1 = this.userService.modelResponse(shipmentAccess);
    forkJoin(res, res1).subscribe((result: any) => {
      if (result[0]?.response === "0" && result[1]?.response === "0") {
        this.loader = false;
        let chatMessage: any = {};
        chatMessage['system'] = 'We can help you on shipment tracking and creating quotes';
        this.chatMessages.push(chatMessage);
      } else {
        this.getResponseFromNifi(message);
      }
    })
  }

  getResponseFromNifi(message: string) {
    let chatMessage: any = {};
    this.userService.getchatbot(this.concatenate(this.type, message)).subscribe((response: any) => {
      this.actionRequired = true;
      this.loader = false;
      if (response != undefined && response != null) {
        let serveMessage: any = {};
        serveMessage['system'] = response;
        this.chatMessages.push(serveMessage);
      }
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
    // if (this.type === 'cart')
    //   // this.callIntro('cart')
    // else {
    //   let cart = {
    //     'system': name,
    //     'user': ''
    //   };
    //   this.chatMessages.push(cart);
    // }
  }


  public concatenate(type: string, message: string) {
    switch (type) {
      case 'shipment':
        return 'Please provide shipment tracking details of ' + message;
      case 'cart':
        return 'Create cart for products ' + this.selectProduct;
      case 'fraud':
        return 'please provide fraud detection id' + message;
      default:
        return '';
    }

  }
  selectProduct: any;
  public selectedCheckbox() {
    let checkedValues = this.cart_List.filter(x => x.isChecked == true);
    this.selectProduct = checkedValues.map(x => x.name);
    this.updateMessage('')
  }

  public onCheckChange(event: any) {
    this.cart_List[event].isChecked = this.cart_List[event].isChecked === false ? true : false;
  }

  setLoginDisplay() {
    console.log(this.authService.instance.getAllAccounts());
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    }
  }

  loginRedirect() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    } else {
      this.authService.loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
        });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}