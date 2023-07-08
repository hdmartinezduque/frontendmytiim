import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { Observable, of } from 'rxjs';
import { PollsToDo } from '../../interfaces/fillOutSurvey/fillOutSurvey.interface';

@Injectable({
  providedIn: 'root'
})
export class PendingsServicesService {

  constructor(
    private http: HttpRequestService
    ) { }

    public getPendingsSurvey(): Observable<PollsToDo> {
      // // return this.http.get(request);

      // return of(
      //   [
      //     {
      //       codigoEncuesta: 1,
      //        nombreEncuesta: "Encuesta de prueba",
      //    }as PendingsSurvey,

      //   //  {
      //   //   codigoEncuesta: 2,
      //   //    nombreEncuesta: "Encuesta de prueba",
      //   //  }as PendingsSurvey,

         
          
      //   ]
      // )

      return this.http.get({endpoint: 'polls/to-do'})
    }


}
