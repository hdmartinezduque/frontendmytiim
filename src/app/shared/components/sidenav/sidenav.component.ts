import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { PollsToDo } from '../../interfaces/fillOutSurvey/fillOutSurvey.interface';
import { BehaviorSubject, Observable, exhaustMap, map, shareReplay } from 'rxjs';
import { PendingsServicesService } from '../../services/pendings/pendings-services.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() isMenuOpen: boolean | undefined;
  @Output() clickedEventSidenav = new EventEmitter<boolean>()

  updatePendingsSurvey$: Observable<number> | undefined;
  public pendingsSurvey$ = new BehaviorSubject<void>(undefined);

  constructor(
    private router:Router,
    private pendingsSurvey: PendingsServicesService
  ){}
  
  ngOnInit(): void {
      this.updatePendingsSurvey$ = this.pendingsSurvey$.pipe(
        exhaustMap(() => this.pendingsSurvey.getPendingsSurvey().pipe(
          map( (polls: PollsToDo) => polls.closures.length + polls.follow.length)
        )
      ),
        shareReplay()
      );
      this.router.events.subscribe(() => this.pendingsSurvey$.next());
  }

  public alDarClickSidebar(ruta: string):void{
    this.router.navigate([ruta])
  }

  public clickedEventSidenavA(isMenuOpen: boolean): void {
    this.clickedEventSidenav.emit(isMenuOpen);
  }

}
