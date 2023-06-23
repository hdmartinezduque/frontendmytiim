import { Component } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-views-container',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent {
  public isMenuOpen: boolean = false;
  public isMenuOpenCopy: boolean = false;

  public onSidenavChanged(sidenav: any): void {
    this.isMenuOpen = sidenav;

    if (this.isMenuOpen) {
      setTimeout(() => this.isMenuOpenCopy = !!this.isMenuOpen, 150)
    } else {
      this.isMenuOpenCopy = this.isMenuOpen;
    }
  }

}
