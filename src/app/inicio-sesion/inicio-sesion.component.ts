
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InicioSesionService } from 'src/app/shared/services/inicio-sesion/inicio-sesion.service';
import { ResponseData } from 'src/app/shared/interfaces/http-request';
import { LoginRequest } from '../shared/interfaces/login/login';
import { PermisosService } from '../shared/services/permisos/permisos.service';
import { Permisos } from '../shared/interfaces/permisos/permisos.interface';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class  InicioSesionComponent implements OnInit {
  errorMessage: string = '';
  showError: boolean = false;
  validform: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: InicioSesionService,
    private permisosService: PermisosService
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
          let msg = response.message;
          this.messageSuccess(msg);
        } else if (!response?.data?.token) {
          let msg = 'No se ha generado el token correctamente.'; 
          this.messageSuccess(msg);
        } else {
         this.getPermisons(values.username)
        }
      },
      () => {
        let msg = 'Ocurrió un error al intentar iniciar sesión, por favor intentalo de nuevo';
        this.messageSuccess(msg);
      }
    )
  }

  private getPermisons(username: string): void {
    this.permisosService.getPermisosServidor(username).subscribe(
      (permisos: Permisos) => {
        this.permisosService.setPermisos(permisos)
        this.redirect();
      },
      () => {
        this.showError = true;
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión, por favor intentalo de nuevo';
      }
    )
    
  }

  private redirect() {
    const previousRoute = this.loginService.getPreviousRoute();
    this.router.navigate([previousRoute])
  }

  messageSuccess(message: string) {
    this.showError = true;
    this.errorMessage = message;
    setTimeout(() => {this.showError = false}, 3000);
  }
}
