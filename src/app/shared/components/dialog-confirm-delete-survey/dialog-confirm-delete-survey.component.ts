import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-success',
  templateUrl: './dialog-confirm-delete-survey.component.html',
  styleUrls: ['./dialog-confirm-delete-survey.component.scss']
})
export class DialogConfirmDeleteSurveyComponent
 {

  constructor(
    @Inject(MAT_DIALOG_DATA ) public data: { message: string },
    private dialogRef: MatDialogRef<DialogConfirmDeleteSurveyComponent
    >) { 
  }
  
  closeDialog(confirm?: boolean) {
    this.dialogRef.close(confirm);
  }
}
