import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

constructor(
  private router:Router
){}

public alDarClickSidebar(ruta: string):void{
this.router.navigate([ruta])
}


}
