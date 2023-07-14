
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Permisos } from 'src/app/shared/interfaces/permisos/permisos.interface';
import { PermisosService } from 'src/app/shared/services/permisos/permisos.service';
@Injectable({
    providedIn: 'root'
})
export class PermisosVerEncuestaCierrePeriodo implements CanActivate {
    constructor(
        private permisosService: PermisosService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const permisos: Permisos = this.permisosService.getPermisos();
        const roles = sessionStorage.getItem('roles')?.split(',');
        const permisosRoles: any =  permisos.modulos?.configuraciones.encuestaCierrePeriodo.roles;
        const rolesPermitidos: any = permisosRoles && Object.keys(permisosRoles).filter((pRol: string) => permisosRoles[pRol])
        const result = !!roles?.find((rol: string) =>  rolesPermitidos && !!rolesPermitidos.find((permRol: string) => permRol === rol ));
        return result
    }
}