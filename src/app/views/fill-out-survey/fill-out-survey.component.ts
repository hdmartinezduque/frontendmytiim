import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AnswerFillOutSurvey, FillOutQuestion, FillOutSurvey, SetRequestFillOutSuvey } from 'src/app/shared/interfaces/fillOutSurvey/fillOutSurvey.interface';
import { FillOutSurveyService } from 'src/app/shared/services/fillOutSurvey/fill-out-survey.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fill-out-survey',
  templateUrl: './fill-out-survey.component.html',
  styleUrls: ['./fill-out-survey.component.scss']
})
export class FillOutSurveyComponent implements OnInit {
  public survey$: Observable<FillOutSurvey> | undefined;
  public formSurvey = this.formBuilder.group({})
  type: string = '';

  constructor(
    private fillOutSurveyService: FillOutSurveyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.type = window.location.pathname.split('/')[window.location.pathname.split('/').length -1];
    const pollId = window.location.pathname.split('/')[window.location.pathname.split('/').length -2];
    this.survey$ = this.fillOutSurveyService.getFillOutSurvey(pollId);
  }

  public createDynamicQuestionForm(question: FillOutQuestion): string {
    const { id } = question
    const formControlName = `control-${id}`
    const newControl =  new FormControl('', [Validators.required]);
    this.formSurvey.addControl(formControlName, newControl)

    return formControlName;
  }

  public finalizarEncuesta(pollId: number): void {
    if (this.formSurvey.valid) {
      const formValues: any = this.formSurvey.value
      const answers: Array<AnswerFillOutSurvey> = Object.keys(formValues).map((key: string) => {
        const questionId = Number(key.split('control-')[1])
        const value = formValues[key]
        return {questionId, value}
      })
      const request: SetRequestFillOutSuvey = {
        pollId,
        userId:  Number(sessionStorage.getItem('userId')),
        answers
      }
      this.fillOutSurveyService.setFillOutSurvey(request).subscribe(() => {
        const route = 'home/pendings';
        this.router.navigate([route])
      })
    }
    
  }

}
