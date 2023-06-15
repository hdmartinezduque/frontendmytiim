import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LogoutGuard implements CanActivate {
    constructor(
        private router: Router,
    ) {}

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        const sesion = sessionStorage.getItem('token')
        if (!sesion) {
            return true;
        } else {
            this.router.navigate(['home'])
            return false;
        }
    }
}