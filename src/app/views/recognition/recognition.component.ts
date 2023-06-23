import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, exhaustMap, map, shareReplay } from 'rxjs';
import { GetRecognition, PostRecognition, Recognition, RecognitionTeam, RecognitionUser } from '../../shared/interfaces/recognition/recognition';
import { combineLatest } from 'rxjs';
import { RecognitionServiceService } from '../../shared/services/recognition/recognition-service.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-recognition',
  templateUrl: './recognition.component.html',
  styleUrls: ['./recognition.component.scss']
})
export class RecognitionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  recognitionForm: FormGroup = this.formBuilder.group({
    buttonList: [1, [Validators.required]],
    listAddressees: [null, [Validators.required]],
    commentDescribe: [null, [Validators.required]],
  });

  errorMessage: string = '';
  successMessage: string = '';
  showSucces: boolean = false;
  showError: boolean = false;
  objectiveId: string | undefined;
  userId: string | null | undefined;

  public userRecognition$: Observable<Array<RecognitionUser>> | undefined
  public teamRecognition$: Observable<Array<RecognitionTeam>> | undefined
  public combineUserTeam$: Observable<any> | undefined
  public recognitionCreate$: Observable<PostRecognition> | undefined;
  public recognitionView$: Observable<GetRecognition[]> | undefined;
  public dataTableQuestions$: Observable<Array<GetRecognition>> | undefined;
  public loadDataTable$ = new BehaviorSubject<void>(undefined);
  public dataSource: any = [];




  constructor(
    private formBuilder: FormBuilder,
    private recognitionServiceService: RecognitionServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.userRecognition$ = this.recognitionServiceService.getListUserRecognition()
    this.teamRecognition$ = this.recognitionServiceService.getListTeamRecognition()
    this.combineUserTeam$ = combineLatest(this.userRecognition$, this.teamRecognition$).pipe(
      map(([userRecognition, teamRecognition]) => {

        const userRecognitionData: Array<Recognition> = userRecognition.map((userRecognitionData: RecognitionUser) => {
          return {
            id: userRecognitionData.userId,
            description: `${userRecognitionData.userName}  ${userRecognitionData.userLastName}`
          }
        })

        const teamRecognitionData: Array<Recognition> = teamRecognition.map((teamRecognitionData: RecognitionTeam) => {
          return {
            id: teamRecognitionData.groupId,
            description: teamRecognitionData.groupDescribe
          }
        })

        return {
          userRecognitionData,
          teamRecognitionData
        }
      })
    )
    this.recognitionView$ = this.loadDataTable$.pipe(
      exhaustMap(() => this.recognitionServiceService.viewAllRecognition()),
      shareReplay()
    );
    this.recognitionView$.subscribe((res) => {
      console.log(res)
    });
  }

  onSubmit() {
    const valuesForm = this.recognitionForm.value
    this.recognitionForm.valid
    // console.log(valuesForm)
    const request: PostRecognition = {
      type: valuesForm.buttonList,
      ids: valuesForm.listAddressees,
      userId: Number(sessionStorage.getItem("userId")),
      commentDescribe: valuesForm.commentDescribe,
    } as PostRecognition
    this.recognitionCreate$ = this.recognitionServiceService.createRecognition(request);
    this.recognitionCreate$.subscribe((res) => {
      if (res) {
        this.showSucces = true;
        this.successMessage = 'Reconocimiento agregado con exito';
        setTimeout(() => this.showSucces = false, 5000)
        this.loadDataTable$.next();
      }
    })
  };

  getToolTipInfo() {
    return 'Si deseas enviarle un reconocimiento a un compañero o varios compañeros, debes seleccionar la categoria Compañero(s). \n\n Si quieres enviar un reconocimiento a un equipo o varios equipos de trabajo debes seleccionar la categoria Equipo(s).';
  }
}

