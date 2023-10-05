import { Injectable } from '@angular/core';
import { environment } from './environments/environment';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private msalService: MsalService, private broadcastService: MsalBroadcastService) { }

  public getLogin() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    const userRequest = {
      scopes: [environment.clientId],
      loginHint: localStorage.getItem('loginMailid')
    }
    if (isIE) {
      this.msalService.loginRedirect();
    } else {
      this.msalService.loginRedirect();
    }

    this.broadcastService.msalSubject$.subscribe(response => {
      // localStorage.setItem('AccessToken', response.idToken.rawIdToken);
      // localStorage.setItem('expires', JSON.stringify(response.idToken.expiration));
      // localStorage.setItem('loginMailid', response['idTokenClaims'].preferred_username);
      // localStorage.setItem('mailid', response['idTokenClaims'].preferred_username);
      console.log(response);
    });

    // this.msalService.acquireTokenRedirect('user').subscribe(res => {
    //   console.log(res);
    // })
  }

  getValidate() {
    let expires = localStorage.getItem('expires');
    let accessToken = localStorage.getItem('AccessToken');
    if (accessToken != null && accessToken != undefined && accessToken != '' && expires != null && expires != undefined && (Date.now() / 1000 < Number(expires))) {
      try {
        let validToken = jwt_decode(accessToken);
        if (localStorage.getItem('loginMailid') != null) {
          return true;
        } else {
          return false;
        }
      } catch (Error) {
        return false;
      }
    }
    else {
      return false;
    }

  }
}
