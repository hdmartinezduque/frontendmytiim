import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpRequestService } from '../http-request/http-request.service';

import { Period } from '../../interfaces/survey/survey';


@Injectable({
  providedIn: 'root'
})
export class CloseSurveyService {
  [x: string]: any;

  constructor(
    private http: HttpRequestService 
  ) { }
   
  public getPeriods(periodId?: number): Observable<Array<Period>> {
    if(!periodId){
      periodId = 0;
    }
    return this.http.get({endpoint: `periods?active=`+periodId})
  }
}
