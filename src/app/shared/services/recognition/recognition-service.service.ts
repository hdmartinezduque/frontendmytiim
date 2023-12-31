import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { Observable, of } from 'rxjs';
import {  FilterRecognition, GetRecognition, GetRecognitionResponse, PostRecognition, PostRecognitionResponse, RecognitionTeam, RecognitionUser } from '../../interfaces/recognition/recognition';
import { PostParams } from '../../interfaces/http-request';

@Injectable({
  providedIn: 'root',
})
export class RecognitionServiceService {
  constructor(private http: HttpRequestService) {}

  public createRecognition(body: PostRecognition): Observable<any> {
    const request: PostParams = {
      endpoint: `comment/recognition`,
      body,
    };
    return this.http.post(request);
  }

  public createRecognitionResponse(
    body: PostRecognitionResponse
  ): Observable<any> {
    const request: PostParams = {
      endpoint: `commentFeedback`,
      body,
    };
    return this.http.post(request);
  }

  public getListTeamRecognition(): Observable<Array<RecognitionTeam>> {
    return this.http.get({ endpoint: 'group' });
  }

  public getListUserRecognition(): Observable<Array<RecognitionUser>> {
    return this.http.get({ endpoint: 'user/actives' });
  }

  public viewAllRecognition(
    filter: FilterRecognition
  ): Observable<Array<GetRecognition>> {
    return this.http.post({
      endpoint: 'comment/recognition/list',
      body: filter,
    });
  }

  public viewRecognitionResponse(commentId: number): Observable<Array<GetRecognitionResponse>> {
    return this.http.get({ endpoint: `commentFeedback/comment/${commentId}` })
  }

  // public viewRecognitionResponse(): Observable<Array<GetRecognitionResponse>> {
  //   return this.http.get({ endpoint: `commentFeedback/comment/1` })
  // }

}
