import { InicioSesionService } from '../../services/inicio-sesion/inicio-sesion.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{
  user: string = '';
  userName: string = '';
  
  @Input() sidenav!: MatSidenav;
  @Input() isMenuOpen: boolean | undefined;
  @Output() onSidenavChanged = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private loginService: InicioSesionService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      this.user = sessionStorage.getItem('token') || '';
    })
    this.userName = sessionStorage.getItem('userName') || '';
    
  }
  
  onClick() {
    // this.sidenav.toggle();
    this.onSidenavChanged.emit(!this.isMenuOpen)
  }

  public goToLogin(): void {
    this.router.navigate(['login'])
  }

  public logout(): void {
    this.loginService.logout();
    this.router.navigate(['login'])
  }
}
