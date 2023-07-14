import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Permisos } from '../../interfaces/permisos/permisos.interface';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor() { }

  getPermisos(): Permisos {
    return  JSON.parse(sessionStorage.getItem('permisos') || '' );
  }

  setPermisos(permisos: Permisos): void {
    sessionStorage.setItem( 'permisos', JSON.stringify(permisos) );
  }

  getPermisosServidor(username: string): Observable<Permisos> {
    const permisos: Permisos = {
      modulos: {
        objetivos: {
          verObjetivos: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          },
          crearObjetivos: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          },
          editarObjetivos: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          },
          registrarAvance: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          },
          verDetalle: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          },
          VerObjetivosOtrosUsuarios: {
            roles: {
              empleado: false,
              lider: true,
              administrador: true,
            }
          }
        },
        reconocimiento: {
          verReconocimientos: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          }
        },
        misPendientes: {
          verMisPendientes: {
            roles: {
              empleado: true,
              lider: true,
              administrador: true,
            }
          }
        },
        indicadores: {
          verIndicadores: {
            roles: {
              empleado: false,
              lider: false,
              administrador: true,
            }
          }
        },
        configuraciones: {
          encuestaCierrePeriodo: {
            roles: {
              empleado: true,
              lider: false,
              administrador: false,
            }
          },
          encuestaSeguimientoContinuo: {
            roles: {
              empleado: true,
              lider: false,
              administrador: false,
            }
          },
        },
      }
    }

    return of(permisos)
  }
}
