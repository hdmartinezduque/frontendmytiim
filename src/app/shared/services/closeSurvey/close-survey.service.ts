import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { Period, ViewPeriod } from '../../interfaces/survey/survey';
import { Observable, of } from 'rxjs';
import { GetParams } from 'src/app/shared/interfaces/http-request';

@Injectable({
  providedIn: 'root'
})
export class CloseSurveyService {

  constructor(
    private http: HttpRequestService 
  ) { }
   
  public getPeriod(): Observable<Array<Period>> {
    return this.http.get({endpoint: 'periods'})
    // return of(
    //   [
    //     {
    //       id: 1,
    //       periodId: 1,
    //       describe: 'Q1',
    //     } as Period,
    //     {
    //       id: 2,
    //       periodId: 2,
    //       describe: 'Q2',
    //     } as Period,
    //     {
    //       id: 3,
    //       periodId: 3,
    //       describe: 'Q3',
    //     } as Period,
    //   ]
    // )
  }

  public getQuestions(): Observable<Array<ViewPeriod>> {
    // return this.http.get({endpoint: 'poll-questions'})
    return of(
      [
        {
          codigoId: 1,
          periodDiscribe: 'Q1',
          question: 'Prueba1',
          isRequired: 'SI',
        } as ViewPeriod,
        {
          codigoId: 2,
          periodDiscribe: 'Q2',
          question: 'Prueba2',
          isRequired: 'NO',
        }as ViewPeriod,
        {
          codigoId: 3,
          periodDiscribe: 'Q3',
          question: 'Prueba3',
          isRequired: 'SI',
        }as ViewPeriod,
        
      ]
    )
  }
  
  
}
