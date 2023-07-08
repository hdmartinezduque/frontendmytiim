import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
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
  ) { }

  public periods$: Observable<Array<Period>> | undefined;
  public questions$: Observable<Array<Question>> | undefined;
  public viewPeriods$: Observable<Array<ViewPeriod>> | undefined;

  public closeSurvey: FormGroup = this.formBuilder.group({
    questionId: [null, Validators.required],
    periodId: [null, Validators.required],
    isRequired: [false],
    pollTypeId: [2]
  })

  public dataSource: any;
  public displayedColumns = ['id', 'idPeriod', 'questionDescribe', 'isRequired', 'acciones'];
  public dataTableQuestions$: Observable<Array<Question>> | undefined;
  public loadDataTable$ = new BehaviorSubject<void>(undefined);
  public messageAlert = '';
  public showAlert = false;
  public alertType = 'success';


  ngOnInit(): void {
    this.questions$ = this.closeSurveyService.getQuestions()
    this.periods$ = this.periodSurveyService.getPeriods(1)

    this.dataTableQuestions$ = this.loadDataTable$.pipe(
      exhaustMap(() => this.closeSurveyService.getPollQuestions(2)),
      shareReplay()
    );

    this.dataTableQuestions$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 10;
    });
  }

  public submitSurvey() {
    const formValues = this.closeSurvey.value;
    const repeatedQuestion: boolean = !!this.dataSource.data.find((question: Question) => question.questionId === formValues.questionId)

    if (this.closeSurvey.valid && !repeatedQuestion) {
      this.closeSurveyService.setPollQuestion(this.closeSurvey.value).subscribe(() => {
        this.loadDataTable$.next();
        this.messageSuccess('La pregunta se ha agregado con exito');
        this.closeSurvey.reset();        
        this.closeSurvey.controls['questionId'].setErrors(null);
        this.closeSurvey.controls['periodId'].setErrors(null);
      }, () => this.messageError('Ocurrio un error al intentar agregar la pregunta, por favor intentalo de nuevo.'))
    }

    if (repeatedQuestion) {
      this.messageError('La pregunta ya ha sido agregada anteriormente.')
    }

    if (!this.closeSurvey.valid) {
      this.messageError('Completa los campos requeridos.')
    }
  }

  popConfirmDelete(questionId: string) {
    let message = '¿Estas seguro de eliminar la pregunta de la encuesta?';
    const dialogRef = this.dialog.open(DialogConfirmDeleteSurveyComponent, {
      disableClose: true,
      panelClass: 'dialog-overlay', data: { message }
    });

    dialogRef.afterClosed().subscribe((confirm: boolean) => confirm && this.deleteQuestion(questionId))

  }

  deleteQuestion(questionId: string) {
    this.closeSurveyService.delleteQuestion(questionId).subscribe(() => {
      this.loadDataTable$.next();
      this.messageSuccess('La pregunta se ha eliminado con exito');
    }, () => this.messageError('Ocurrio un error al intentar eliminar la pregunta, por favor intentalo de nuevo.'))
  }

  messageSuccess(message: string) {
    this.showAlert = true;
    this.messageAlert = message;
    this.alertType = 'success';
    setTimeout(() => { this.showAlert = false }, 5000)
  }

  messageError(message: string) {
    this.showAlert = true;
    this.messageAlert = message;
    this.alertType = 'error';
    setTimeout(() => { this.showAlert = false }, 5000)
  }

}
