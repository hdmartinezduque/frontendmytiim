import { Component, OnInit } from '@angular/core';
import { PendingsSurvey } from '../../shared/interfaces/pendings/pendings.interface';
import { PendingsServicesService } from 'src/app/shared/services/pendings/pendings-services.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent implements OnInit {

  public pendingsSurvey$: Observable<PendingsSurvey[]> | undefined;

  constructor (
  
    private pendingsSurvey: PendingsServicesService,   
      ){}
 
  ngOnInit(): void {
    this.pendingsSurvey$ = this.pendingsSurvey.getPendingsSurvey()
   
  }

  

}
