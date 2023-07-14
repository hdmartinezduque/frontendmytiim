import { ContinuousSurveyComponent } from './components/follow-up/continuous-survey/continuous-survey.component';
import { CloseSurveyComponent } from './components/follow-up/close-survey/close-survey/close-survey.component';
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { PermisosVerEncuestaSeguimientoContinuo } from 'src/app/shared/guards/permisos/permisosConfiguraciones/permisosVerEncuestaSeguimientoContinuo.guard';
import { PermisosVerEncuestaCierrePeriodo } from 'src/app/shared/guards/permisos/permisosConfiguraciones/permisosVerEncuestaCierrePeriodo.guard';



const routes: Routes = [
  {
    path:'follow-up',
    component: FollowUpComponent
  },
  {
    path:'follow-up/continuous-survey',
    component: ContinuousSurveyComponent,
    canActivate: [PermisosVerEncuestaSeguimientoContinuo]
  },
  {
    path: 'follow-up/close-survey',
    component: CloseSurveyComponent,
    canActivate: [PermisosVerEncuestaCierrePeriodo]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }