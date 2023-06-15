import { HttpRequestService } from '../http-request/http-request.service';
import { Metrica, Compromise } from '../../interfaces/objectives/objective.interface';
import { Observable, of, map } from 'rxjs';
import { GetParams, PostParams, PutParams } from '../../interfaces/http-request';
import { Injectable } from '@angular/core';
import { CreateCommitment } from '../../interfaces/objectives/objective.interface';

@Injectable({
  providedIn: 'root'
})
export class CompromiseServicesService {

  constructor(
    private http: HttpRequestService
  ) { }

  getCompromises(objectiveId: string): Observable<Array<Compromise>> {
    return this.http.get({endpoint: `commitment/objectives/${objectiveId}`}).pipe(
      map((res: any) => {
        return res.sort((a: Compromise, b: Compromise) => a.commitmentId - b.commitmentId)
      })
    );
  }
  
  createCompromises(body: Compromise): Observable<any> {
    const request: PostParams = {
      endpoint: `commitment`,
      body,
    }
    return this.http.post(request)
  }

  editCompromise(body: Compromise) {
    const request: PutParams = {
      endpoint: `commitment`,
      body,
    }
    return this.http.put(request)
  }

  managmentCompromises(body: {commitmentId: number | undefined, commitmentAdvance: number | undefined}): Observable<any> {
    const {commitmentId, commitmentAdvance} = body;
    const request: PostParams = {
      endpoint: 'commitment/advance',
      body: {
        commitmentId,
        commitmentAdvance
      }
    }
    return this.http.post(request);
  }

  getMetricas(params: GetParams): Observable<Array<Metrica>> {
    // return this.http.get(params)
    return of(
      [
        {
          measureId: 1,
          measureDescribe: 'Porcentaje',
          measureCode: '1'
        } as Metrica,
        {
          measureId: 2,
          measureDescribe: 'Cantidad',
          measureCode: '2'
        } as Metrica,
        {
          measureId: 3,
          measureDescribe: 'Monetario',
          measureCode: '3'
        } as Metrica
      ]
    )
  }

createCommitment(body: CreateCommitment): Observable<any>{
  const request: PostParams = {
    endpoint: `commitment`,
    body:{
      
    }
  }
  return this.http.post(request);
} 

}
