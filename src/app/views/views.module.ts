import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecognitionComponent } from './recognition/recognition.component';
import { MaterialModule } from '../shared/modules/material.module';
import { SharedModule } from '../shared/shared.module';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';
import { PendingsComponent} from './pendings/pendings.component';
import { FillOutSurveyComponent } from './fill-out-survey/fill-out-survey.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent, 
    RecognitionComponent,
    ChangePasswordComponent,
    ViewsComponent,
    PendingsComponent,
    FillOutSurveyComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    ViewsRoutingModule
  ]
  
})
export class ViewsModule { }