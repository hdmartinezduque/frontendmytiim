import { MaterialModule } from './../../shared/modules/material.module';
import { SharedModule } from '../../shared/shared.module';
import { DialogFormCompromisoComponent } from './record-progress/my-compromises/dialog-form-compromiso/dialog-form-compromiso.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectivesRoutingModule } from './objectives-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddObjectiveComponent } from './add-objective/add-objective.component';
import { ListObjectiveComponent } from './list-objective/list-objective.component';
import { RecordProgressComponent } from "./record-progress/record-progress.component";
import { UpdateStatusComponent } from './record-progress/update-status/update-status.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { getPaginatorTextConfig } from '../../shared/generics/pagination-config';
import { DialogSuccessComponent} from '../../shared/components/dialog-success/dialog-success.component';
import { CommentsComponent } from './record-progress/comments/comments.component';
import { MyCompromisesComponent } from './record-progress/my-compromises/my-compromises.component';
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
