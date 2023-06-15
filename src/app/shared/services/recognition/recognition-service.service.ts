import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { Observable, of } from 'rxjs';
import { Recognition } from '../../interfaces/recognition/recognition';

@Injectable({
  providedIn: 'root'
})
export class RecognitionServiceService {

  constructor(
    private http: HttpRequestService
  ) { }

  public getListUserRecognition(): Observable<Array<Recognition>> {
    // return this.http.get({endpoint: 'user/actives'})

    return of(
      [
        {
          userId: 1,
          userName: "willian",
          userLastName: "Lopez",
          statusId: 1
        } as Recognition,
      ]
    )

  }

  // public getListTeamRecognition(): Observable<Array<>>{
  //   return this.http.get({endpoint: })
  // }

}
