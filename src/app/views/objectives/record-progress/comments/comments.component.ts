import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable, exhaustMap, filter, find, map, shareReplay, tap } from 'rxjs';
import { CommentType, CommentCreate, CommentView } from 'src/app/shared/interfaces/comments/comment.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentServicesService } from 'src/app/shared/services/comment-services/comment-services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  commentForm: FormGroup = this.formBuilder.group({
    commentTypeId: [null, [Validators.required]],
    commentDescribe: [null, [Validators.required]],
  });

  objectiveId: string | undefined;
  userId: string | null | undefined;
  errorMessage: string = '';
  successMessage: string = '';
  showSucces: boolean = false;
  showError: boolean = false;
  
  public commentType$: Observable<CommentType[]> | undefined;
  public commentType: CommentType[] | undefined;
  public commentCreate$: Observable<CommentCreate> | undefined;
  public commentView$: Observable<CommentView[]> | undefined;
  public loadDataForm$ = new BehaviorSubject<void>(undefined);
  public dataSource: any = [];
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentServicesService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.commentType$ = this.commentService.getCommentType({
      endpoint: 'commentType',
      params: undefined
    }).pipe(map(list => list.filter(t => t.commentTypeId != 2)));
    this.commentType$.subscribe(value => this.commentType = value);

    this.activatedRoute.params.subscribe(params => {
      this.objectiveId = params['id']; 
    })
    this.userId = sessionStorage.getItem('userId')

    const arrayUrl = this.router.url.split('/')
    const objectiveId = Number(arrayUrl[arrayUrl.length - 1])
    this.commentView$ = this.loadDataForm$.pipe(
      exhaustMap(() => this.commentService.getCommentView(objectiveId)),
      shareReplay(),
      map(list => list.map(comm => {
        return {
          ...comm,
          commentTypeDescribe: this.commentType?.find(item => item.commentTypeId == comm.commentTypeId)?.commentTypeDescribe
        }
      })),
    );
    this.commentView$.subscribe((res) => 
      this.dataSource = new MatTableDataSource(res));
      this.dataSource.paginator = this.paginator;
      this.paginator.pageSize = 5;
  }

  onSumit() {

    const commentForm  = this.commentForm.value
    if (this.commentForm.invalid) {
      this.showError = true;
      this.errorMessage = 'El formulario no está bien diligenciado';
      setTimeout(() => this.showError = false, 2000)
      commentForm.markAllAsTouched();
    }

    this.commentCreate$ = this.commentService.createComment({ ...this.commentForm.value, userId: this.userId, objectiveId: this.objectiveId, statusId: 1, commentType: true });
    console.log('comment :', commentForm)
    this.commentCreate$.subscribe((res) => {
      if (res) {
        this.showSucces = true;
        this.successMessage = 'Tu comentario se ha creado con éxito';
        setTimeout(() => this.showSucces = false, 5000)
        this.commentForm.reset();        
        this.loadDataForm$.next();
      }
    });
    return;
  }
}


