import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ChangePasswordRequest } from '../../../shared/interfaces/login/login';
import { Observable } from 'rxjs/internal/Observable';
import { InicioSesionService } from '../../../shared/services/inicio-sesion/inicio-sesion.service';
import { PutParams } from 'src/app/shared/interfaces/http-request';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public messageSuccess: string = '';
  public showSuccess: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  validform: boolean = false;

  changePasswordForm: FormGroup = this.formBuilder.group({
    newPassword: [null, Validators.required],
    confirmPassword: [null, Validators.required]
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private cambiarPassword: InicioSesionService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) { }

  ngOnInit(): void {

  }


  onSubmit() {
    const { newPassword, confirmPassword } = this.changePasswordForm.value;
    if (newPassword != confirmPassword) {
      this.showError = true;
      this.errorMessage = 'Las claves no coinciden';
      setTimeout(() => this.showError = false, 2000)
    } else {

      if (!this.changePasswordForm.invalid && newPassword === confirmPassword) {
        const body: ChangePasswordRequest = {
          userId: sessionStorage.getItem('userId'),
          password: newPassword
        }
        const endpoint: string = 'auth/password'
        const request: PutParams = { endpoint, body }
        this.cambiarPassword.updatePassword(request).subscribe((res) => {


          if (res) {
            this.showSuccess = true;
            this.messageSuccess = 'Cambio de clave exitoso';
            setTimeout(() => this.showSuccess = false, 5000)
            this.dialogRef.close(true);
          }
        });
      }
    }
  }
}
