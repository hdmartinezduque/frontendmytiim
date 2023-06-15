import { InicioSesionService } from '../../services/inicio-sesion/inicio-sesion.service';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  user: string = '';
  
  @Input() sidenav!: MatSidenav

  constructor(
    private router: Router,
    private loginService: InicioSesionService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      this.user = sessionStorage.getItem('token') || '';
    })
  }
  
  onClick() {
    this.sidenav.toggle();
  }

  public goToLogin(): void {
    this.router.navigate(['login'])
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['login'])
  }
}
