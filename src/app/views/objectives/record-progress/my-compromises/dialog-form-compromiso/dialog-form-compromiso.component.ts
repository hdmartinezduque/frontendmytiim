import { Router } from '@angular/router';
import { CompromiseServicesService } from '../../../../../shared/services/compromise-services/compromise-services.service';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compromise, Metrica } from '../../../../../shared/interfaces/objectives/objective.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DataDialogFormCompromisos } from 'src/app/shared/interfaces/comments/comment.interface';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-dialog-form-compromiso',
  templateUrl: './dialog-form-compromiso.component.html',
  styleUrls: ['./dialog-form-compromiso.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class DialogFormCompromisoComponent implements OnInit {
  public compromisos: Compromise | undefined;
  public showError: boolean = false;
  public messageError: string = '';
  public metricas$: Observable<Array<Metrica>> | undefined;
  public today = new Date();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Compromise,
    private formBuilder: FormBuilder,
    private compromiseService: CompromiseServicesService,
    public dialogRef: MatDialogRef<DialogFormCompromisoComponent>,
    private router: Router
  ) {
    this.compromisos = data;
  }

  public formCompromiso: FormGroup = this.formBuilder.group({
    commitmentDescribe: [this.data?.commitmentDescribe || null, [Validators.required, Validators.maxLength(400)]],
    commitmentDate: [ new Date(
      Number(this.data?.commitmentDate?.split('/')[2]),
      Number(this.data?.commitmentDate?.split('/')[1]) -1,
      Number(this.data?.commitmentDate?.split('/')[0])
    ) || null, Validators.required],
    measureId: [this.data?.measureId || null, Validators.required],
    commitmentAdvance: [this.data?.commitmentAdvance || null, [Validators.required,
      this.data?.measureId === 1 ? Validators.max(100) : Validators.max(10000000000)
    ]],
    commitmentGoal: [this.data?.commitmentGoal || null, [Validators.required, 
      this.data?.measureId === 1 ? Validators.max(100) : Validators.max(10000000000)
    ]],
  })

  public formManagement: FormGroup = this.formBuilder.group({
    commitmentAdvance: [this.data?.commitmentAdvance || null, [Validators.required, this.data?.measureId === 1 ? Validators.max(100) : Validators.max(10000000000)]],
  })

  ngOnInit(): void {
    this.metricas$ = this.compromiseService.getMetricas({endpoint: 'metricas'})
    this.listeningForCompromisoMeasureId();

  }

  private listeningForCompromisoMeasureId(): void  {
    this.formCompromiso?.get('measureId')?.valueChanges.subscribe((value: number) => {
      this.formCompromiso?.get('commitmentAdvance')?.clearValidators()
      this.formCompromiso?.get('commitmentGoal')?.clearValidators()
      if (value === 1) {
        this.formCompromiso?.get('commitmentAdvance')?.addValidators([Validators.required, Validators.max(100)]) 
        this.formCompromiso?.get('commitmentGoal')?.addValidators([Validators.required, Validators.max(100)]) 

      } else {
        this.formCompromiso?.get('commitmentAdvance')?.addValidators([Validators.required, Validators.max(10000000000)])
        this.formCompromiso?.get('commitmentGoal')?.addValidators([Validators.required, Validators.max(10000000000)])
      }
      this.formCompromiso?.get('commitmentAdvance')?.updateValueAndValidity();
      this.formCompromiso?.get('commitmentGoal')?.updateValueAndValidity();
    })
  }

  public submitCompromise(): void  {
    const commitmentId = this.compromisos?.commitmentId;
    const arrayUrl = this.router.url.split('/')
    const objectiveId = Number(arrayUrl[arrayUrl.length - 1])
    const request: Compromise = {...this.formCompromiso.value, objectiveId, commitmentId}
    
    if (this.formCompromiso.valid) {
      if (this.data?.getForm) {
        this.closeDialog({form: this.formCompromiso.value })
      } else {
        this.submitHttpOnComponent(request, commitmentId)
      }
    }
  }

  private submitHttpOnComponent(request: Compromise, commitmentId: any) {
      // let {commitmentDate} = this.formCompromiso.value;
      // commitmentDate = moment(commitmentDate).format('DD/MM/YYYY');
    if (this.compromisos?.type === 'edit') {
      this.compromiseService.editCompromise(request)
        .subscribe(() => this.closeDialog({flag: this.compromisos?.type}), () => this.errorMessage() )
    } else if(this.compromisos?.type !== 'edit' && this.compromisos?.type !== 'managment')  {
      this.compromiseService.createCompromises(request)
        .subscribe(() => this.closeDialog({flag: 'create'}), () => this.errorMessage() )
    }

    if (this.compromisos?.type === 'managment') {
      const requestManagement = {commitmentId, commitmentAdvance: this.formManagement.value.commitmentAdvance}
      this.compromiseService.managmentCompromises(requestManagement)
        .subscribe(() => this.closeDialog({flag: this.compromisos?.type}), () => this.errorMessage() )
    }
  }

  private errorMessage(): void  {
    this.showError = true;
    this.messageError = 'Ocurrio un error intentalo de nuevo por favor'
  }

  public closeDialog(value?: DataDialogFormCompromisos): void {
    this.dialogRef.close(value);
  }
}
