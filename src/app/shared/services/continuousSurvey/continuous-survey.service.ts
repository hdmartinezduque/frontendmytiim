import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../../interfaces/survey/survey';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';

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

  public getPollQuestions(): Observable<Array<Question>> {
    return this.http.get({endpoint: 'poll-questions'})
  }

  public setPollQuestion(body: any): Observable<any> {
    return this.http.post({ body , endpoint: 'poll-questions'})
  }

  public delleteQuestion(questionId: string): Observable<any> {
    return this.http.delete({endpoint: `poll-questions/${questionId}`})
  }
}
