import { Component, OnInit } from '@angular/core';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatDialog } from '@angular/material/dialog';
import { getPaginatorTextConfig } from '../../shared/generics/pagination-config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  showSuccess: boolean = false
  messageSuccess: string = ""

  constructor(
    private dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    const statusId = sessionStorage.getItem("statusId")

    if (statusId === "7") {
      const dialogRef = this.dialog.open(ChangePasswordComponent, { disableClose: true, panelClass: 'dialog-overlay' });
      dialogRef.afterClosed().subscribe((value: any) => {
        console.log("value", value)
        if (value) {
          this.showSuccess = true
          this.messageSuccess = "La clave a sido cambiada con exito"
          setTimeout(() =>{
            this.showSuccess = false
          },7000)
        }
      })
    }
  }
}
