import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { FillOutSurvey, SetRequestFillOutSuvey } from '../../interfaces/fillOutSurvey/fillOutSurvey.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FillOutSurveyService {

  constructor(
    private http: HttpRequestService
  ) { }

    getFillOutSurvey(pollId?: string): Observable<FillOutSurvey> {
      return this.http.get({endpoint: `polls/${pollId}/questions`})
    }

    setFillOutSurvey(body: SetRequestFillOutSuvey): Observable<any> {
      return this.http.post({endpoint: 'polls/questions', body})
    }
}
