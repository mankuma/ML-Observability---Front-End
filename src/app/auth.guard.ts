import { Injectable, inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn, UrlTree } from '@angular/router';

import { Observable, Subject, map } from 'rxjs';
import { environment } from './environments/environment';
import { MsalBroadcastService, MsalGuard, MsalService } from '@azure/msal-angular';
import { UserService } from './user.service';
import { Call } from '@angular/compiler';


//const doAuth = environment.authenticate;

const doAuth = environment.authenticate;

@Injectable()
export class AuthGuard {
    constructor(public userService: UserService, private msalService: MsalService, private msalGuard: MsalGuard, public router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean | UrlTree {
        let subject = new Subject();
        let retValue: any;
        this.msalGuard.canActivate(route, state).pipe().forEach((res: any) => {
            let user = this.msalService.instance.getActiveAccount();
            this.userService.checkUser(user?.username).subscribe((res: any) => {
                if (res['metadata'].rows != 0) {
                    localStorage.setItem('userName', JSON.stringify(user?.name));
                    localStorage.setItem('loginMailid', JSON.stringify(user?.username));
                    localStorage.setItem('expires', JSON.stringify(user?.idTokenClaims?.exp));
                    retValue = true;
                } else {
                    localStorage.clear();
                    this.msalService.logoutRedirect();
                    retValue = false;
                }
            });
        })
        return retValue;
    }
}
