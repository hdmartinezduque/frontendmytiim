
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InicioSesionService } from 'src/app/shared/services/inicio-sesion/inicio-sesion.service';
import { ResponseData } from 'src/app/shared/interfaces/http-request';
import { LoginRequest } from '../shared/services/login/login';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent implements OnInit {
  errorMessage: string = '';
  showError: boolean = false;
  validform: boolean = false;
 
  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: InicioSesionService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.listeningFormLogin();
  }

  loginForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  private listeningFormLogin() {
    this.loginForm.valueChanges.subscribe((values) => {
      this.showError = false;
      this.validform = this.loginForm.valid;
      const valueFailed = values.username ? (values.password ? '' : 'contraseña') : 'usuario'
      this.errorMessage = !this.validform ? `Por favor ingresa un(a) ${valueFailed} correcto` : '';
    })
  }

  public login(): void {
    this.errorMessage = '';
    const values: LoginRequest = this.loginForm.value;
    const validform = this.loginForm.valid;
    this.showError = false;

    this.loginService.login(values).subscribe(
      (response: ResponseData) => {
        if (!!response?.message) {
          this.showError = true;
          this.errorMessage = response.message;
        } else if (!response?.data?.token) {
          this.showError = true;
          this.errorMessage = 'No se ha generado el token correctamente.';
        } else {
          // if (response.data.status.statusId == 7) {
          //   this.dialog.open(ChangePasswordComponent, { disableClose: true, panelClass: 'dialog-overlay' });
          // }
          this.router.navigate(['home'])
        }
      },
      () => {
        this.showError = true;
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión, por favor intentalo de nuevo';
      }
    )
  }
}


