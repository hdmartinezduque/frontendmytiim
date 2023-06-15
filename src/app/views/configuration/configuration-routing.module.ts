import { ContinuousSurveyComponent } from './components/follow-up/continuous-survey/continuous-survey.component';
import { CloseSurveyComponent } from './components/follow-up/close-survey/close-survey/close-survey.component';
import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { FollowUpComponent } from './components/follow-up/follow-up.component';



const routes: Routes = [
  {
    path:'follow-up',
    component: FollowUpComponent
  },
  {
    path:'follow-up/continuous-survey',
    component: ContinuousSurveyComponent
  },
  {
    path: 'follow-up/close-survey',
    component: CloseSurveyComponent
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }