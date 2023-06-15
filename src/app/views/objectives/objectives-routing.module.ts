import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListObjectiveComponent } from './list-objective/list-objective.component';
import { AddObjectiveComponent } from './add-objective/add-objective.component';
import { RecordProgressComponent } from "./record-progress/record-progress.component";
import { CommentsComponent } from './record-progress/comments/comments.component';

const routes: Routes = [
  { path: '', component: ListObjectiveComponent },
  { path: 'add', component: AddObjectiveComponent },
  { path: 'edit/:id', component: AddObjectiveComponent },
  { path: 'progress/:id', component: RecordProgressComponent},
  { path: 'comment/:id', component: CommentsComponent},
  { path: '**', redirectTo: '' }
];


// localhost:4200/objectives/add

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectivesRoutingModule { }
