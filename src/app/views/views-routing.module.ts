import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecognitionComponent } from './recognition/recognition.component';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';
import { PendingsComponent } from './pendings/pendings.component';
import { FillOutSurveyComponent } from './fill-out-survey/fill-out-survey.component';
import { PermisosVerObjetivosGuard } from '../shared/guards/permisos/permisosObjetivos/permisosVerObjetivo.guard';
import { PermisosVerReconocimientosGuard } from '../shared/guards/permisos/permisosReconocimientos/permisosVerReconocimientos.guard';
import { PermisosVerMisPendientes } from '../shared/guards/permisos/permisosMisPendientes/permisosVerMisPendientes.guard';

const routes: Routes = [
  {
    path: '',
    component: ViewsComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'recognition',
        component: RecognitionComponent,
      },
      {
        path:'recognition', component: RecognitionComponent,
        canActivate: [PermisosVerReconocimientosGuard]
      },
      {
        path:'pendings', component: PendingsComponent,
        canActivate: [PermisosVerMisPendientes]
      },
      { 
        path: 'objectives', 
        loadChildren: () => import('./objectives/objectives.module').then(m => m.ObjectivesModule),
        canActivate: [PermisosVerObjetivosGuard]
      },
      { 
        path: 'configuration', 
        loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule),
        
      },
      {
        path: 'encuesta/:id/:type',
        component: FillOutSurveyComponent,
      },
      {
        path: 'metrics',
        loadChildren: () =>
          import('./metrics/metrics.module').then((m) => m.MetricsModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule {}
