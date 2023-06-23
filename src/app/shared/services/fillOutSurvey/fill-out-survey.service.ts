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
      // const dummy: FillOutSurvey = {
      //   "pollId": 1,
      //   "describe": "aqui descripcion de la encuesta",
      //   "pollCode": "SC12Q22023",
      //   "endDate": "03/06/2023",
      //   "questions": [
      //     {
      //       "id": 1,
      //       "describe": "Como te sentiste en el sprint",
      //       "answerTypeId": "1",
      //       "options": null
      //     },
      //     {
      //       "id": 2,
      //       "describe": "Tuviste algun bloqueo",
      //       "answerTypeId": "2",
      //       "options": [
      //         "SI",
      //         "NO"
      //       ]
      //     },
      //     {
      //       "id": 3,
      //       "describe": "Como te sentiste este sprint",
      //       "answerTypeId": "3",
      //       "options": [
      //         "Cansado",
      //         "Presionado",
      //         "Entusiasmado",
      //         "Tranquilo"
      //       ]
      //     }
      //   ]
      // }
      // return of(dummy)
    }

    setFillOutSurvey(body: SetRequestFillOutSuvey): Observable<any> {
      return this.http.post({endpoint: 'polls/questions', body})
    }
}
