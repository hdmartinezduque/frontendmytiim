import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecognitionComponent } from './recognition/recognition.component';
import { HomeComponent } from './home/home.component';
import { ViewsComponent } from './views.component';
import { PendingsComponent } from './pendings/pendings.component';
import { FillOutSurveyComponent } from './fill-out-survey/fill-out-survey.component';

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
        path: 'pendings',
        component: PendingsComponent,
      },
      {
        path: 'objectives',
        loadChildren: () =>
          import('./objectives/objectives.module').then(
            (m) => m.ObjectivesModule
          ),
      },
      {
        path: 'configuration',
        loadChildren: () =>
          import('./configuration/configuration.module').then(
            (m) => m.ConfigurationModule
          ),
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
