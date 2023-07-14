import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  exhaustMap,
  map,
  of,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';
import {
  FilterRecognition,
  GetRecognition,
  GetRecognitionResponse,
  PostRecognition,
  PostRecognitionResponse,
  Recognition,
  RecognitionTeam,
  RecognitionUser,
} from '../../shared/interfaces/recognition/recognition';
import { combineLatest } from 'rxjs';
import { RecognitionServiceService } from '../../shared/services/recognition/recognition-service.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';


@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss'],
})
export class RecognitionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  recognitionForm: FormGroup = this.formBuilder.group({
    buttonList: [1, [Validators.required]],
    listAddressees: [null, [Validators.required]],
    commentDescribe: [null, [Validators.required]],
  });

  recognitionResponseForm: FormGroup = this.formBuilder.group({
    commentFeedbackDescribe: [null, [Validators.required]],
  });

  recognitionFilterForm: FormGroup = this.formBuilder.group({
    user: [null],
    team: [null],
    dateStart: [null],
    dateEnd: [null],
  });

  errorMessage: string = '';
  successMessage: string = '';
  showSucces: boolean = false;
  showError: boolean = false;
  objectiveId: string | undefined;
  userId: string | null | undefined;
  responseTextArea: number | undefined;
  showForm: boolean = true;

  public userRecognition$: Observable<Array<RecognitionUser>> | undefined;
  public teamRecognition$: Observable<Array<RecognitionTeam>> | undefined;
  public combineUserTeam$: Observable<any> | undefined;
  public recognitionCreate$: Observable<PostRecognition> | undefined;
  public recognitionResponseCreate$:
    | Observable<PostRecognitionResponse>
    | undefined;
  public recognitionView$: Observable<GetRecognition[]> | undefined;
  public recognitionResponseView$: Observable<GetRecognitionResponse[]> | undefined;
  public dataTableQuestions$: Observable<Array<GetRecognition>> | undefined;
  public loadDataTable$ = new BehaviorSubject<void>(undefined);
  public dataSource: any = [];
  data: any;
  public loadingDialogRef: MatDialogRef<LoadingSpinnerComponent> | undefined;
  filteredOptions: Observable<RecognitionUser[]> | undefined = of([]);
  userCounts: RecognitionUser[] = [];

  recognitionList?: GetRecognition[];
  recognitionListPaginator?: GetRecognition[];

  initialFormValue: any;

  public showResponse: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private recognitionServiceService: RecognitionServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initialFormValue = this.recognitionForm.value;
    this.userRecognition$ =
      this.recognitionServiceService.getListUserRecognition();
    this.teamRecognition$ =
      this.recognitionServiceService.getListTeamRecognition();
    this.combineUserTeam$ = combineLatest(
      this.userRecognition$,
      this.teamRecognition$
    ).pipe(
      map(([userRecognition, teamRecognition]) => {
        const userRecognitionData: Array<Recognition> = userRecognition.map(
          (userRecognitionData: RecognitionUser) => {
            return {
              id: userRecognitionData.userId,
              description: `${userRecognitionData.userName}  ${userRecognitionData.userLastName}`,
            };
          }
        );

        const teamRecognitionData: Array<Recognition> = teamRecognition.map(
          (teamRecognitionData: RecognitionTeam) => {
            return {
              id: teamRecognitionData.groupId,
              description: teamRecognitionData.groupDescribe,
            };
          }
        );

        return {
          userRecognitionData,
          teamRecognitionData,
        };
      })
    );
    this.searchFilters();
    this.userRecognition$.subscribe((res) => {
      this.userCounts = res
        .map((user) => {
          return {
            ...user,
            userFullname: `${user?.userName} ${user?.userLastName}`,
          };
        })
        .sort();
    });
    this.filteredOptions = this.recognitionFilterForm.controls[
      'user'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        const name = typeof value === 'string' ? value : value?.userFullname;
        return name ? this._filter(name as string) : this.userCounts.slice();
      })
    );
  }

  onSubmit(myForm: any) {
    const valuesForm = this.recognitionForm.value;
    const isValid = this.recognitionForm.valid;
    if (isValid) {
      const ids =
        this.recognitionForm.value.listAddressees != null
          ? this.recognitionForm.value.listAddressees.map(
              (user: Recognition) => {
                return user.id;
              }
            )
          : [];
      const request: PostRecognition = {
        type: valuesForm.buttonList,
        ids: ids,
        userId: Number(sessionStorage.getItem('userId')),
        commentDescribe: valuesForm.commentDescribe,
      } as PostRecognition;
      this.recognitionCreate$ =
        this.recognitionServiceService.createRecognition(request);
      this.recognitionCreate$.subscribe((res) => {
        if (res) {
          this.showSucces = true;
          this.successMessage = 'Reconocimiento agregado con éxito';
          setTimeout(() => (this.showSucces = false), 6000);
          this.loadDataTable$.next();
          this.recognitionForm.reset();
          myForm.resetForm();
          this.recognitionForm.patchValue(this.initialFormValue);
        }
      });
    }
  }
  responseRecognition() {
    const valuesForm = this.recognitionResponseForm.value;
    const isValid = this.recognitionResponseForm.valid;
    if (isValid) {
      this.loadingDialogRef = this.dialog.open(LoadingSpinnerComponent, {
        disableClose: true,
        panelClass: 'dialog-overlay',
      });
      const request: PostRecognitionResponse = {
        commentId: this.responseTextArea,
        userId: Number(sessionStorage.getItem('userId')),
        commentFeedbackDescribe: valuesForm.commentFeedbackDescribe,
      } as PostRecognitionResponse;
      this.recognitionResponseCreate$ =
        this.recognitionServiceService.createRecognitionResponse(request);
      this.recognitionResponseCreate$.subscribe((res) => {
        console.log(res);
        if (res) {
          this.loadingDialogRef?.close();
          this.showSucces = true;
          this.successMessage = 'La respuesta se ha agregado con éxito';
          setTimeout(() => (this.showSucces = false), 5000);
          this.loadDataTable$.next();
          this.recognitionResponseForm.reset();
          this.showForm = false;
          // console.log(res);
        }
      });
    }
  }

  

  getToolTipInfo() {
    return 'Si deseas enviarle un reconocimiento a un compañero o varios compañeros, debes seleccionar la categoria Compañero(s). \n\n Si quieres enviar un reconocimiento a un equipo o varios equipos de trabajo debes seleccionar la categoria Equipo(s).';
  }

  recognitionResponse(Id: number) {
    this.responseTextArea = Id;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.recognitionResponseForm.reset();
  }

  showRecognitionResponse(recognition: GetRecognition) {
    const { commentId } = recognition;
    this.recognitionListPaginator = this.recognitionListPaginator?.map((recognitionA: GetRecognition) => {
      if (recognitionA.commentId === commentId) {
        recognitionA.opened = !recognitionA.opened;
      } else {
        recognitionA.opened = false;
      }
      return recognitionA;
    });
    if (commentId && recognition.opened) {
      this.recognitionResponseView$ = this.loadDataTable$.pipe(
        exhaustMap(() => this.recognitionServiceService.viewRecognitionResponse(commentId)),
        shareReplay()
      );
    } else {
      this.recognitionResponseView$ = undefined;
    }
  }

  searchFilters() {
    const form = this.recognitionFilterForm.value;
    const datesFilter: FilterRecognition = {
      set: 1,
      userId:
        form.user && form.user != null && form.user.userId
          ? form.user.userId
          : null,
      groupId:
        form.team && form.team != null && form.team.id ? form.team.id : null,
      commentDateInit:
        form.dateStart && form.dateStart != null
          ? (form.dateStart as Date)
          : null,
      commentDateFinal:
        form.dateEnd && form.dateEnd != null ? (form.dateEnd as Date) : null,
    };
    this.recognitionView$ = this.loadDataTable$.pipe(
      exhaustMap(() =>
        this.recognitionServiceService.viewAllRecognition(datesFilter)
      ),
      shareReplay()
    );
    this.recognitionView$.subscribe((res) => {
      this.recognitionList = res;
      this.recognitionListPaginator = this.recognitionList?.slice(0, 5);
    });
  }

  resetFilters() {
    const datesFilter: FilterRecognition = {
      set: 1,
      userId: null,
      groupId: null,
      commentDateInit: null,
      commentDateFinal: null,
    };
    this.recognitionView$ = this.loadDataTable$.pipe(
      exhaustMap(() =>
        this.recognitionServiceService.viewAllRecognition(datesFilter)
      ),
      shareReplay()
    );
    this.recognitionView$.subscribe((res) => {
      console.log(res);
    });
    this.recognitionFilterForm.reset();
  }

  displayAutocomplete(user: RecognitionUser): string {
    return user?.userFullname || '';
  }
  private _filter(value: string): RecognitionUser[] {
    return this.userCounts.filter((option: RecognitionUser) =>
      option.userFullname?.toLowerCase().includes(value?.toLowerCase())
    );
  }
  handlePageEvent(event: PageEvent) {
    this.recognitionListPaginator = this.recognitionList?.slice(
      event.pageIndex * event.pageSize,
      event.pageIndex * event.pageSize + event.pageSize
    );
  }

  resetForm() {
    this.recognitionForm.reset(this.initialFormValue);
  }
}
