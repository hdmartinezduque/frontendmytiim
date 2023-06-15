import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-success.component.html',
  styleUrls: ['./dialog-success.component.scss']
})
export class DialogSuccessComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA ) public data: { message: string },
    private dialogRef: MatDialogRef<DialogSuccessComponent>) { 
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
