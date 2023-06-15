import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecognitionComponent } from './recognition/recognition.component';
import { MaterialModule } from '../shared/modules/material.module';
import { SharedModule } from '../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { ChangePasswordComponent } from './home/change-password/change-password.component';
import { HomeComponent } from './home/home.component';
import { ViewsRoutingModule } from './views-routing.module';
import { ViewsComponent } from './views.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent, 
    RecognitionComponent,
    ChangePasswordComponent,
    ViewsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatCardModule,
    SharedModule,
    ViewsRoutingModule
  ]
  
})
export class ViewsModule { }
