import { Component, OnInit } from '@angular/core';
import { ObjetiveServicesService } from '../../../shared/services/objetive-services/objetive-services.service';
import { Objective, ObjectiveType, Objetivo, Status } from '../../../shared/interfaces/objectives/objective.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-record-progress',
  templateUrl: './record-progress.component.html',
  styleUrls: ['./record-progress.component.scss'],
})
export class RecordProgressComponent implements OnInit {
  objId: string | undefined;
  objective: Objective | undefined;
  objTypes: ObjectiveType[] = [];
  public objetivos$: Observable<Array<Objetivo>> | undefined;
  public status$: Observable<Array<Status>> | undefined;
  public objetivo: number | undefined = undefined;
  public progress$: Observable<Objective> | undefined;

  constructor(
    private objectiveService: ObjetiveServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.objId = params['id'];
    });
    
    this.progress$ = this.objectiveService.getObjectivesById({endpoint:'objective/'+this.objId});
    this.progress$.subscribe((res) => {

    });
  }


}




