import { Injectable } from '@angular/core';
import { HttpRequestService } from '../http-request/http-request.service';
import { GetParams } from '../../interfaces/http-request';
import { Observable, of } from 'rxjs';
import { PendingsSurvey } from '../../interfaces/pendings/pendings.interface';

@Injectable({
  providedIn: 'root'
})
export class PendingsServicesService {

  constructor(
    private http: HttpRequestService
    ) { }

    public getPendingsSurvey(): Observable<PendingsSurvey[]> {
      // return this.http.get(request);

      return of(
        [
          {
            codigoEncuesta: 1,
             nombreEncuesta: "Encuesta de prueba",
         }as PendingsSurvey,

        //  {
        //   codigoEncuesta: 2,
        //    nombreEncuesta: "Encuesta de prueba",
        //  }as PendingsSurvey,

         
          
        ]
      )


    }


}
