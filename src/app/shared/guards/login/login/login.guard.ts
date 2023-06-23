import { InicioSesionService } from 'src/app/shared/services/inicio-sesion/inicio-sesion.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private router: Router,
        private inicioSesionService: InicioSesionService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        setTimeout(() => this.inicioSesionService.setPreviousRoute(state.url), 100)
        
        const sesion = sessionStorage.getItem('token')
        if (sesion) {
            return true;
        } else {
            this.router.navigate(['login'])
            return false;
        }
    }
}