import { ContinuousSurveyComponent } from './components/follow-up/continuous-survey/continuous-survey.component';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared/modules/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from  '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { getPaginatorTextConfig } from '../../shared/generics/pagination-config';
import { FollowUpComponent } from './components/follow-up/follow-up.component';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CloseSurveyComponent } from './components/follow-up/close-survey/close-survey/close-survey.component';







@NgModule({
  declarations: [
    FollowUpComponent,
    ContinuousSurveyComponent,
    CloseSurveyComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule,
    MaterialModule
  ],  
providers: [
  { provide: MatPaginatorIntl, useValue: getPaginatorTextConfig() }
]  
})

export class ConfigurationModule { }
