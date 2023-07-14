export interface Permisos {
    modulos: {
      objetivos: PermisosObjetivos;
      reconocimiento:PermisosReconocimiento;
      misPendientes: PermisosMisPendientes;
      indicadores: PermisosIndicadores;
      configuraciones: PermisosConfiguraciones;
    }
  }
  
  export interface PermisosObjetivos {
    verObjetivos: PermisoDetails;
    crearObjetivos: PermisoDetails;
    editarObjetivos: PermisoDetails;
    registrarAvance: PermisoDetails;
    verDetalle: PermisoDetails;
    VerObjetivosOtrosUsuarios: PermisoDetails;
  }
  
  export interface PermisosReconocimiento {
    verReconocimientos:  PermisoDetails;
  }
  
  export interface PermisosMisPendientes {
    verMisPendientes: PermisoDetails;
  }
  
  export interface PermisosIndicadores {
    verIndicadores: PermisoDetails;
  }
  
  export interface PermisosConfiguraciones {
    encuestaSeguimientoContinuo: PermisoDetails;
    encuestaCierrePeriodo: PermisoDetails;
  }
  
  export interface PermisoDetails {
    ruta?: string;
    roles: Roles;
  }
  
  export interface Roles {
    empleado: boolean;
    lider: boolean;
    administrador: boolean;
  }