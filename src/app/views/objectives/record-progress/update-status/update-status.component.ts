import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ResponseData } from 'src/app/shared/interfaces/http-request';
import {
  CloseObjectiveRequest,
  Objective,
  Status,
} from 'src/app/shared/interfaces/objectives/objective.interface';
import { ObjetiveServicesService } from 'src/app/shared/services/objetive-services/objetive-services.service';

import { MatDialog } from '@angular/material/dialog';
import { DialogSuccessComponent } from 'src/app/shared/components/dialog-success/dialog-success.component';

@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss'],
})
export class UpdateStatusComponent implements OnInit {
  objId: string | undefined;
  objective: Objective | undefined;
  public objStatus: Observable<Array<Status>> | undefined;
  valorOption: number | undefined;
  public responseData: Observable<ResponseData> | undefined;
  errorMessage: string = '';
  showError: boolean = false;
  listOfNumbers: Array<number> = [1, 2, 3, 4, 5];

  //---------------
  validform: boolean = false;
  statusForm: FormGroup = this.fb.group({
    statusId: [null, [Validators.required]],
    objectiveQualify: [null],
    objectiveObservations: [null],
  });
  //---------------

  constructor(
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private ro: Router,
    private objetiveService: ObjetiveServicesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.objStatus = this.objetiveService.getStatus({ endpoint: 'status/O' });
    this.objStatus.subscribe((res) => console.log('res:', res));
    this.ar.params.subscribe((params) => {
      this.objId = params['id'];
    });
  }

  updateStatusObjective(): void {
    const values: CloseObjectiveRequest = this.statusForm.value;

    this.responseData = this.objetiveService.putStatusObjective({
      endpoint: 'objective/' + this.objId + '/close',
      body: values,
    });

    this.responseData.subscribe((res) => {
      if (res) {
        let message = 'Tu objetivo se ha actualizado con éxito';
        this.dialog.open(DialogSuccessComponent, {
          disableClose: true,
          panelClass: 'dialog-overlay',
          data: { message },
        });
        this.ro.navigate(['home/objectives']);
      }
    });
  }

  onSubmit() {
    const { objectiveQualify } = this.statusForm.value;
    // console.log (this.statusForm.value)
    // console.log(typeof objectiveQualify)
    // console.log (objectiveQualify)

    if (objectiveQualify === null && this.statusForm.value.statusId === 5) {
      this.showError = true;
      this.errorMessage = 'Debes seleccionar una puntuación';
      setTimeout(() => (this.showError = false), 4000);
    } else if (this.statusForm.valid) {
      this.updateStatusObjective();
    }
  }

  getToolTipInfo() {
    return 'Estados de objetivo: \n\n - En proceso: Objetivo que se encuentra a tiempo de ser cumplido según la fecha límite asignada \n - Atrasado: Objetivo que no ha tenido un avance significativo según la fecha límite asignada. \n - En riesgo: Objetivo que está al límite de no cumplirse según la fecha límite asignada. \n - En pausa: Objetivo que no se trabajará en el momento, pero que no se eliminará para darle continuidad en el futuro cercano. \n - Cerrado: Incluye objetivos que se han cerrado debido a su cumplimiento o vencimiento de la fecha límite asignada.';
  }
}
