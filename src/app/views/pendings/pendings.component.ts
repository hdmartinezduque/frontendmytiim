import { Component, OnInit } from '@angular/core';
import { PendingsSurvey } from '../../shared/interfaces/pendings/pendings.interface';
import { PendingsServicesService } from 'src/app/shared/services/pendings/pendings-services.service';
import { Observable } from 'rxjs';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PollsToDo } from 'src/app/shared/interfaces/fillOutSurvey/fillOutSurvey.interface';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent implements OnInit {

  public pendingsSurvey$: Observable<PollsToDo> | undefined;

  pendingSurveyForm: FormGroup = this.formBuilder.group({
    pollId : [null, [Validators.required]],
    code   : [null, [Validators.required]],
    describe : [null, [Validators.required]],
  });

  constructor (
  
    private pendingsSurvey: PendingsServicesService,
    private formBuilder: FormBuilder,
    private router: Router
      ){}

  
  ngOnInit(): void {
    this.pendingsSurvey$ = this.pendingsSurvey.getPendingsSurvey()
  }

  
  public onClickedFollow(pollId: number): void {
    this.router.navigate(['home/encuesta/' , pollId, 'follow'])
  }

  public onClickedClosures(pollId: number): void {
    this.router.navigate(['home/encuesta/' , pollId, 'closures'])
  }
}
