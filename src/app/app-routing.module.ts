import { PresentationComponent } from './shared/components/presentation/presentation.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login/login/login.guard';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { LogoutGuard } from './shared/guards/login/logout/logout.guard';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/views.module').then(m => m.ViewsModule),
    canActivate: [LoginGuard]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: 'login',
    component: InicioSesionComponent,
    // loadChildren: () => import('./inicio-sesion/inicio-sesion.module').then(m => m.InicioSesionModule),
    canActivate: [LogoutGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }