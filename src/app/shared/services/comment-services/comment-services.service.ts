import { Injectable } from '@angular/core';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { CommentType, CommentCreate, CommentView } from '../../interfaces/comments/comment.interface';
import { Observable, filter, tap } from 'rxjs';
import { GetParams, PostParams } from 'src/app/shared/interfaces/http-request';

@Injectable({
  providedIn: 'root'
})
export class CommentServicesService {

  constructor(
    private http: HttpRequestService
  ) { }

  getCommentType(request: GetParams): Observable<CommentType[]> {
    return this.http.get(request);
  }

  createComment(body: CommentCreate): Observable<any> {
    const request: PostParams = {
      endpoint: `comment`,
      body,
    }
    return this.http.post(request);
  }

  getCommentView(objectiveId: number): Observable<Array<CommentView>> {
    return this.http.get({endpoint: `comment/objectives/${objectiveId}`});
  }
}
