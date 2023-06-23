import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() isMenuOpen: boolean | undefined;
  @Output() clickedEventSidenav = new EventEmitter<boolean>()

  constructor(
    private router:Router
  ){}


  public alDarClickSidebar(ruta: string):void{
    this.router.navigate([ruta])
  }

  public clickedEventSidenavA(isMenuOpen: boolean): void {
    this.clickedEventSidenav.emit(isMenuOpen);
  }

}
