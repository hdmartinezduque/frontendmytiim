import { MaterialModule } from './../../shared/modules/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogFormCompromisoComponent } from './record-progress/my-compromises/dialog-form-compromiso/dialog-form-compromiso.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from  '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { ObjectivesRoutingModule } from './objectives-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddObjectiveComponent } from './add-objective/add-objective.component';
import { ListObjectiveComponent } from './list-objective/list-objective.component';
import { RecordProgressComponent } from "./record-progress/record-progress.component";
import { UpdateStatusComponent } from './record-progress/update-status/update-status.component';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { getPaginatorTextConfig } from '../../shared/generics/pagination-config';
import { DialogSuccessComponent} from '../../shared/components/dialog-success/dialog-success.component';
import { CommentsComponent } from './record-progress/comments/comments.component';
import { MyCompromisesComponent } from './record-progress/my-compromises/my-compromises.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { DialogConfirmDeleteSurveyComponent } from '../../shared/components/dialog-confirm-delete-survey/dialog-confirm-delete-survey.component';
@NgModule({
  declarations: [
    AddObjectiveComponent,
    ListObjectiveComponent,
    RecordProgressComponent,
    DialogSuccessComponent,
    DialogConfirmDeleteSurveyComponent,
    CommentsComponent,
    UpdateStatusComponent,
    MyCompromisesComponent,
    DialogFormCompromisoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ObjectivesRoutingModule,
   MaterialModule,
    SharedModule

  ],
providers: [
  { provide: MatPaginatorIntl, useValue: getPaginatorTextConfig() }
]  
})

export class ObjectivesModule { }
