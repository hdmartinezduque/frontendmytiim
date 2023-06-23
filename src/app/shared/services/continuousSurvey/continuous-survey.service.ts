import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpRequestService } from '../http-request/http-request.service';

import { Question } from '../../interfaces/survey/survey';


@Injectable({
  providedIn: 'root'
})
export class ContinuousSurveyService {

  constructor(
    private http: HttpRequestService
  ) { }

  public getQuestions(): Observable<Array<Question>> {
    return this.http.get({endpoint: 'questions'})
  }

  public getPollQuestions(typePollId: number): Observable<Array<Question>> {
    return this.http.get({endpoint: `poll-questions/${typePollId}`})
  }

  public setPollQuestion(body: any): Observable<any> {
    console.log(body)
    return this.http.post({ body , endpoint: 'poll-questions'})
  }

  public delleteQuestion(questionId: string): Observable<any> {
    return this.http.delete({endpoint: `poll-questions/${questionId}`})
  }
}
