import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject, Observable, exhaustMap, shareReplay, takeUntil } from 'rxjs';
import { Period, Question, ViewPeriod } from 'src/app/shared/interfaces/survey/survey';
import { CloseSurveyService } from 'src/app/shared/services/closeSurvey/close-survey.service';
import { ContinuousSurveyService } from 'src/app/shared/services/continuousSurvey/continuous-survey.service';
import { DialogConfirmDeleteSurveyComponent } from 'src/app/shared/components/dialog-confirm-delete-survey/dialog-confirm-delete-survey.component';


@Component({
  selector: 'app-close-survey',
  templateUrl: './close-survey.component.html',
  styleUrls: ['./close-survey.component.scss']
})
export class CloseSurveyComponent implements OnInit {
@ViewChild(MatPaginator) paginator!: MatPaginator;
constructor(
  private formBuilder: FormBuilder,
  private closeSurveyService: ContinuousSurveyService,
  private periodSurveyService: CloseSurveyService,
  private dialog: MatDialog
) {}

public periods$: Observable<Array<Period>> | undefined;
public questions$: Observable<Array<Question>> | undefined;
public viewPeriods$: Observable<Array<ViewPeriod>> | undefined;
public closeSurvey: FormGroup = this.formBuilder.group({
  questionId: [null, Validators.required],
  periodId: [null, Validators.required],
  isRequired: [false],
  
})

public displayedColumns = ['id', 'idPeriod', 'questionDescribe', 'isRequired', 'acciones'];
public dataSource: any = [];
public dataTableQuestions$: Observable<Array<Question>> | undefined;
public loadDataTable$ = new BehaviorSubject<void>(undefined);
public messageAlert = '';
public showAlert = false;
public alertType = 'success';

  ngOnInit(): void {
    this.questions$ = this.closeSurveyService.getQuestions()
    this.periods$ = this.periodSurveyService.getPeriod()
    this.viewPeriods$ = this.periodSurveyService.getQuestions()

    this.dataTableQuestions$ = this.loadDataTable$.pipe(
      exhaustMap(() => this.closeSurveyService.getPollQuestions()),
      shareReplay()
    );

    this.viewPeriods$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 10;
    });

    
  }

  

  popConfirmDelete(questionId: string) {
    let message = '¿Estas seguro de eliminar la pregunta de la encuesta?';
    const dialogRef = this.dialog.open(DialogConfirmDeleteSurveyComponent, {
      disableClose: true,
      panelClass: 'dialog-overlay', data: { message }  
    });

  }

  

}
