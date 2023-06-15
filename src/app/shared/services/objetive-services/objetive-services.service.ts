import { HttpClient } from '@angular/common/http';
import {
  CreadorObjetivo,
  GrupoObjetivo,
  Objetivo,
  ObjectiveForm,
  ObjectiveType,
  Objective,
  Status,
  Compromise,
  ObjectiveRequest,
} from '../../interfaces/objectives/objective.interface';

import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { HttpRequestService } from 'src/app/shared/services/http-request/http-request.service';
import { GetParams, PostParams, PutParams, ResponseData } from 'src/app/shared/interfaces/http-request';


@Injectable({
  providedIn: 'root'
})
export class ObjetiveServicesService {

  constructor(
    private http: HttpRequestService
  ) { }

  getGrupos(request: GetParams): Observable<Array<GrupoObjetivo>> {
    return this.http.get(request);
  }

  getCreadoresObjetivo(request: GetParams): Observable<Array<CreadorObjetivo>> {
    return this.http.get(request);
  }

  getObjetivos(request: GetParams): Observable<Array<Objetivo>> {
    return this.http.get(request);
  }

  getStatus(request: GetParams): Observable<Array<Status>> {
    return this.http.get(request);
  }

  getObjectivesById(request: GetParams): Observable<Objective> {
    return this.http.get(request)
  }

  // GET

  /*
    Se obtienen los tipos de objetivos del backend
    para mostrar en la lista desplegable del form
    de crear/editar objetivos
  */
  getObjectiveType(): Observable<ObjectiveType[]> {
    const endpoint = env.OBJ_TYPES;

    return this.http.get({ endpoint });
  }

  /*
    Se obtiene la lista de objetivos
  */
  getObjectives(): Observable<Objective[]> {
    const Iduser = sessionStorage.getItem('userId');
    const endpoint = env.OBJECTIVES+`/users/${Iduser}`;

    return this.http.get({ endpoint });
  }

  /* 
    Se obtiene un objetivo por Id
  */
  getObjectiveById(id: string): Observable<Objective> {
    const endpoint = env.OBJECTIVES + `/${id}`

    return this.http.get({ endpoint });
  }

  // POST

  /*
    Se crea un objetivo
  */
  createObjective(form: ObjectiveForm, commitments: Array<Compromise>): Observable<any> {
    const endpoint = env.OBJECTIVES;
    const body: ObjectiveRequest = {
      objectiveTypeId: form.objectiveTypeId,
      objectiveDescribe: form.objectiveDescribe,
      userId: Number(sessionStorage.getItem("userId")),
      commitments
    }
    console.log(body)

    return this.http.post({ endpoint, body });
  }

  // PUT

  /*
    Actualizar el objetivo
  */
  updateObjective(id: string, form: ObjectiveForm): Observable<any> {
    const endpoint = `${env.OBJECTIVES}/${id}`;
    const body = {
      objectiveId: Number(id),
      objectiveTypeId: form.objectiveTypeId,
      objectiveDescribe: form.objectiveDescribe,
      status: {
        statusId: 1,
      },
      user: {
        userId: 1
      },
      group: {
        groupId: 1
      },
      objectiveType: {
        objectiveTypeId: form.objectiveTypeId
      }
    }

    return this.http.put({ endpoint, body });
  }

  getRecordProgress(params: GetParams): Observable<Array<Objective>> {
    return this.http.get(params)
  }

  putStatusObjective(request: PutParams): Observable<ResponseData> {
    return this.http.put(request);
  }
}
