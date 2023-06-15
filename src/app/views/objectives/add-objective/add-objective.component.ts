import { GrupoObjetivo, CreadorObjetivo, Objetivo, Compromise } from '../../../shared/interfaces/objectives/objective.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Objective, ObjectiveType, Status } from '../../../shared/interfaces/objectives/objective.interface';
import { ObjetiveServicesService } from '../../../shared/services/objetive-services/objetive-services.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogSuccessComponent } from '../../../shared/components/dialog-success/dialog-success.component';
import { DialogFormCompromisoComponent } from '../record-progress/my-compromises/dialog-form-compromiso/dialog-form-compromiso.component';

@Component({
  selector: 'app-add-objective',
  templateUrl: './add-objective.component.html',
  styleUrls: ['./add-objective.component.scss']
})
export class AddObjectiveComponent implements OnInit {
  objectiveForm: FormGroup = this.fb.group({
    objectiveTypeId: [null, [Validators.required]],
    objectiveDescribe: [null, [Validators.required]]
  });
  formAlinearObjetivo: FormGroup = this.fb.group({
    grupo: [null, Validators.required],
    creadorObjetivo: [null, Validators.required],
    objetivo: [null, Validators.required]
  })
  objId: string | undefined;
  objective: Objective | undefined;
  objTypes: ObjectiveType[] = [];
  // a esta variable se le debe programar de acuerdo a lo que se quiere hacer, es el unico paso que falta... (Willian)
  public typeComponentMyCompromises: string | undefined;
  public displayedColumns = ['commitmentDescribe', 'commitmentDate', 'commitmentAdvance', 'action'];
  public gruposObjetivo$: Observable<Array<GrupoObjetivo>> | undefined;
  public creadoresObjetivo$: Observable<Array<CreadorObjetivo>> | undefined;
  public objetivos$: Observable<Array<Objetivo>> | undefined;
  public status$: Observable<Array<Status>> | undefined;
  public grupo: number | undefined = undefined;
  public creadorObjetivo: number | undefined = undefined;
  public objetivo: number | undefined = undefined;
  public comprimisesAdded: Array<Compromise> = [];
  
  disabledPanel = false;

  constructor(
    private ar: ActivatedRoute,
    private fb: FormBuilder,
    private ro: Router,
    private objectiveService: ObjetiveServicesService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.managementAlenarObjetivos();
    this.objectiveService.getObjectiveType().subscribe(resp => this.objTypes = resp);

    if (!this.ro.url.includes('edit')) {
      this.typeComponentMyCompromises = 'create'
      this.disabledPanel = true;
      return;
    } else {
      this.typeComponentMyCompromises = 'services'
    }

    this.ar.params.subscribe(params => {
      this.objId = params['id'];
      this.preloadFormData(params['id']);
    });
  }

  private managementAlenarObjetivos() {
    this.gruposObjetivo$ = this.objectiveService.getGrupos({ endpoint: 'group' })
    this.objectiveService.getObjectiveType().subscribe(resp => this.objTypes = resp);
    this.formAlinearObjetivo.valueChanges.subscribe(values => this.formAlienarControl(values))
    this.grupo = undefined;
    this.creadorObjetivo = undefined;
  }

  private formAlienarControl(values: any) {
    const { grupo, creadorObjetivo, objetivo } = values;
    if (grupo && grupo !== this.grupo) {
      this.creadoresObjetivo$ = this.objectiveService.getCreadoresObjetivo({ endpoint: `user/user/${grupo}` })
    }

    if (grupo && creadorObjetivo && creadorObjetivo !== this.creadorObjetivo) {
      this.objetivos$ = this.objectiveService.getObjetivos({ endpoint: `objective/${grupo}/${creadorObjetivo}` })
    }

    this.grupo = grupo;
    this.creadorObjetivo = creadorObjetivo;
    this.objetivo = objetivo;
  }

  preloadFormData(id: string) {
    this.objectiveService.getObjectiveById(id)
      .subscribe(obj => {
        this.objectiveForm.reset({
          objectiveTypeId: obj.objectiveType.objectiveTypeId,
          objectiveDescribe: obj.objectiveDescribe,
        })
      });
  }

  onSubmit() {
    const id = this.objId;
    const form = this.objectiveForm;

    if (form.invalid) {
      window.confirm('El formulario es inválido, revise los campos');
      form.markAllAsTouched();
      return;
    }

    if (!id) {

      this.objectiveService.createObjective({ ...form.value }, this.comprimisesAdded).subscribe(resp => {
        if (resp) {
          let message = 'Tu objetivo se ha creado con éxito';
          this.dialog.open(DialogSuccessComponent, {
            disableClose: true,
            panelClass: 'dialog-overlay', data: { message }
          });
          this.ro.navigate(['/home/objectives/list']);
        }
      });
      return;
    }

    this.objectiveService.updateObjective(id, { ...form.value }).subscribe(resp => {
      if (resp) {
        let message = 'Se han guardado los cambios';
        this.dialog.open(DialogSuccessComponent, {
          disableClose: true,
          panelClass: 'dialog-overlay', data: { message }
        });
        this.ro.navigate(['/home/objectives/list']);
      }
    });

  }

  public onSelectChange(event: any) {
    if (event.value === 2) {
      this.disabledPanel = false;
    } else {
      this.disabledPanel = true;
    }
  }

  public onAddCompromise(compromises: Array<Compromise>) {
    console.log('compromisos: ', compromises)
    this.comprimisesAdded = compromises;
  }

}
