import { BehaviorSubject, Observable, exhaustMap, map, shareReplay } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Question } from 'src/app/shared/interfaces/survey/survey';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContinuousSurveyService } from 'src/app/shared/services/continuousSurvey/continuous-survey.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmDeleteSurveyComponent } from 'src/app/shared/components/dialog-confirm-delete-survey/dialog-confirm-delete-survey.component';

@Component({
  selector: 'app-continuous-survey',
  templateUrl: './continuous-survey.component.html',
  styleUrls: ['./continuous-survey.component.scss']
})
export class ContinuousSurveyComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private formBuilder: FormBuilder,
    private continuousSurveyService: ContinuousSurveyService,
    private dialog: MatDialog
  ) {}
  public questions$: Observable<Array<Question>> | undefined;
  public formSurvey: FormGroup = this.formBuilder.group({
    questionId: [null, Validators.required],
    isRequired: [false],
    pollTypeId: [1]
  })
  public displayedColumns = ['id', 'questionDescribe', 'isRequired', 'acciones'];
  public dataSource: any;
  public dataTableQuestions$: Observable<Array<Question>> | undefined;
  public loadDataTable$ = new BehaviorSubject<void>(undefined);
  public messageAlert = '';
  public showAlert = false;
  public alertType = 'success';

  ngOnInit(): void {
    this.questions$ = this.continuousSurveyService.getQuestions()

    this.dataTableQuestions$ = this.loadDataTable$.pipe(
      exhaustMap(() => this.continuousSurveyService.getPollQuestions(1)),
      shareReplay()
    );

    this.dataTableQuestions$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 10;
    });
  }

  public submitSurvey() {
    const formValues = this.formSurvey.value;
    console.log('this.dataSource.data: ', this.dataSource.data)
    console.log('formValues: ', formValues)
    const repeatedQuestion: boolean = !!this.dataSource.data.find((question: any) => question.questionDescribe === formValues.questionDescribe)

    console.log('repeatedQuestion: ', repeatedQuestion)
    if (this.formSurvey.valid && !repeatedQuestion) {
      this.continuousSurveyService.setPollQuestion(this.formSurvey.value).subscribe(() => {
        this.loadDataTable$.next();
        this.messageSuccess('La pregunta se ha agregado con exito');
      }, () => this.messageError('Ocurrio un error al intentar agregar la pregunta, por favor intentalo de nuevo.')) 
    }

    if (repeatedQuestion) {
      this.messageError('La pregunta ya ha sido agregada anteriormente.')
    }

    if (!this.formSurvey.valid) {
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
    this.continuousSurveyService.delleteQuestion(questionId).subscribe(() => {
      this.loadDataTable$.next();
      this.messageSuccess('La pregunta se ha eliminado con exito');
    }, () => this.messageError('Ocurrio un error al intentar eliminar la pregunta, por favor intentalo de nuevo.')) 
  }

  messageSuccess(message: string) {
    this.showAlert = true;
    this.messageAlert = message;
    this.alertType = 'success';
    setTimeout(() => {this.showAlert = false}, 5000)
  }

  messageError(message: string) {
    this.showAlert = true;
        this.messageAlert = message;
        this.alertType = 'error';
        setTimeout(() => {this.showAlert = false}, 5000)
  }
}
