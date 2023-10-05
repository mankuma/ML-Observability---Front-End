import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { environment } from './environments/environment';


//const doAuth = environment.authenticate;

const doAuth = environment.authenticate;

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (localStorage.getItem('userDetails') != null) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
