import { Component, OnInit, ViewChild, Pipe } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { GrupoObjetivo, ListFilter, Objective, ObjectiveType, Status } from '../../../shared/interfaces/objectives/objective.interface';
import { ObjetiveServicesService } from '../../../shared/services/objetive-services/objetive-services.service';
import { MatSort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, map, of, startWith, tap, filter } from 'rxjs';
import { RecognitionServiceService } from 'src/app/shared/services/recognition/recognition-service.service';
import { RecognitionUser } from 'src/app/shared/interfaces/recognition/recognition';


@Component({
  selector: 'app-list-objective',
  templateUrl: './list-objective.component.html',
  styleUrls: ['./list-objective.component.scss']
})
export class ListObjectiveComponent implements OnInit {
  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private formBuilder: FormBuilder,
    private objetiveService: ObjetiveServicesService,
    private recognitionServiceService : RecognitionServiceService,
    
  ) {
    this.dataSource = new MatTableDataSource<Objective>(this.objective);
  }

  listObjetives:ObjectiveType[] = [];
  objectiveId: string | undefined;
  sidenavOpened: boolean = false;

  //userFilter = new FormControl();
  
  filteredOptions: Observable<RecognitionUser[]> | undefined = of([]);
  userCounts: RecognitionUser[] = [];
  

  public listObjetives$: Observable<ObjectiveType[]> | undefined;
  public groupObjetives$: Observable<Array<GrupoObjetivo>> | undefined;
  public statusObjectives$: Observable<Array<Status>> | undefined;
  public listFilter$: Observable<Array<ListFilter>> | undefined;

  public userObject: any; // Guarda todo el objeto del userId, 
  

  public filterObjective: FormGroup = this.formBuilder.group({
    objectiveTypeId: [null],
    groupId: [null],
    userId: [null],
    statusId: [null],
  });

  // Solo se utiliza para las tablas
  displayedColumns: string[] = ['description', 'category', 'state', 'actions'];
  objective: Objective[] = [];
  dataSource: MatTableDataSource<Objective>;
  tbDataSource: any = [];
  searchTerm: string = '';
  filteredData: any = [];

  
  ngOnInit() {
    this.listObjetives$ = this.objetiveService.getObjectiveType()
    this.groupObjetives$ = this.objetiveService.getGrupos({ endpoint: 'group' })
    this.statusObjectives$ = this.objetiveService.getStatus({ endpoint: 'status/O'})

    
    this.recognitionServiceService.getListUserRecognition()
    .pipe(
      map(res => res.map((user) => {
        return {...user, userFullname: `${user?.userName} ${user?.userLastName}`}
      }).sort())
    )
    .subscribe((userCounts) => this.userCounts = userCounts);

    this.filteredOptions = this.filterObjective.controls['userId'].valueChanges.pipe(
      tap(console.log),
      startWith(''),
      map(value => {
        const name = (typeof value === 'string') ? value : value?.userFullname
        return name ? this._filter(name as string) : this.userCounts.slice()
      })
    )
    this.getObjetives();
  }

  getObjetives(){
    this.objetiveService.getObjectives().subscribe(resp => {
      this.objective = resp;
      this.createTable();
    })
  }

  createTable() {
    this.tbDataSource = new MatTableDataSource(this.objective);
    this.tbDataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;

    //-----------------
    // Configuración de los filtros de ordenamiento
    this.tbDataSource.sortingDataAccessor = (obj: any, property: string) => property.split('.').reduce((o, p) => o && o[p], obj);
    this.tbDataSource.sort = this.sort;
    //------------------ 

    //------------------
    // Configuración de los filtros de busqueda
    this.tbDataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.objectiveDescribe.toLowerCase().includes(searchTerm) ||
        data.objectiveType.objectiveTypeDescribe.toLowerCase().includes(searchTerm) ||
        data.status.statusDescribe.toLowerCase().includes(searchTerm)
      );
    };
    //------------------
  }

  applySearchFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.tbDataSource.filter = filterValue;
  }
  
  displayAutocomplete(user: RecognitionUser): string {
    return user?.userFullname || '';
  }

  private _filter(value: string): RecognitionUser[] {
    return this.userCounts.filter((option: RecognitionUser) => option.userFullname?.toLowerCase().includes(value?.toLowerCase()));
  }


  public applyFilters() {
    
    const form = {...this.filterObjective.value, userId: this.filterObjective.value?.userId?.userId }
    /*let objectiveFilter: Objective[] = JSON.parse(JSON.stringify(this.objective))

      if(form.objectiveTypeId && form.objectiveTypeId !== null) {
        objectiveFilter = objectiveFilter.filter((objective) => objective.objectiveType.objectiveTypeId === form.objectiveTypeId)
        console.log('filter ', objectiveFilter)
      }
      
      if(form.statusId && form.statusId !== null){
         objectiveFilter = objectiveFilter.filter((status) => status.status.statusId === form.statusId)
         console.log('status :', objectiveFilter )
      }

    this.tbDataSource = new MatTableDataSource(objectiveFilter);
    this.tbDataSource.paginator = this.paginator;
    this.paginator.pageSize = 10;*/

    const body = {
      // TO-DO: Pendiente implementar dinámicamente el parámetro set.
      set: 1,
      statusId: (form.statusId)?form.statusId:null,
      objectiveTypeId:(form.objectiveTypeId)?form.objectiveTypeId:null,
      userId: (form.userId)?form.userId:null,
      groupId: (form.groupId)?form.groupId:null  
    }
    

    this.objetiveService.getListFilter(body).subscribe(resp => {
      this.objective = resp;
      this.createTable(); 
    });

  }

  public applyFilterReset() {
    // this.tbDataSource = new MatTableDataSource(this.objective);
    // this.tbDataSource.paginator = this.paginator;
    // this.paginator.pageSize = 10;
    
    location.reload();

  }

  public onDetailsOpen(objective: any) {
    console.log('objective: ', objective)
    this.objectiveId = objective.objectiveId
    this.sidenavOpened = true;
  }
  
  public openedChange(event: any): void {
    this.sidenavOpened = event
  }
}



