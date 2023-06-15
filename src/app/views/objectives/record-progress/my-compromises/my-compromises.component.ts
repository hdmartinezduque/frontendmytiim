import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CompromiseServicesService } from '../../../../shared/services/compromise-services/compromise-services.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { HttpRequestService } from '../../../../shared/services/http-request/http-request.service';
import { Compromise, Metrica } from '../../../../shared/interfaces/objectives/objective.interface';
import { BehaviorSubject, exhaustMap, map, Observable, shareReplay } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DialogFormCompromisoComponent } from './dialog-form-compromiso/dialog-form-compromiso.component';
import { DataDialogFormCompromisos } from 'src/app/shared/interfaces/comments/comment.interface';

@Component({
  selector: 'app-my-compromises',
  templateUrl: './my-compromises.component.html',
  styleUrls: ['./my-compromises.component.scss']
})
export class MyCompromisesComponent implements OnInit{
  @Input() type?: string = 'services';
  @Input() objectiveId?: string;
  @Output() onAddCompromise= new EventEmitter<Array<Compromise>>();
  // dataSource = new MatTableDataSource<any>(this.);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns = ['commitmentDescribe', 'commitmentDate', 'measureDescribe' , 'commitmentAdvance', 'acciones'];
  public messageSuccess: string = '';
  public showSuccess: boolean = false;
  public dataSource: any;

  public dataTableMyCompromises$: Observable<Array<Compromise>> | undefined;
  public loadDataTable$ = new BehaviorSubject<void>(undefined);
  public metricas$: Observable<Array<Metrica>> | undefined;
  public dataSourceStorage: Array<Compromise> = []

  constructor(
    private compromiseService: CompromiseServicesService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.metricas$ = this.compromiseService.getMetricas({endpoint: 'metricas'})
    if (this.type === 'services') {
      const arrayUrl = this.router.url.split('/');
      const objectiveId: any = arrayUrl[arrayUrl.length - 1];
      this.dataTableMyCompromises$ = this.loadDataTable$.pipe(
        exhaustMap(() => this.compromiseService.getCompromises(this.objectiveId || objectiveId)),
        shareReplay(),
        map((values: Array<Compromise>) => {
          values.forEach(value => this.transformToPorcentaje(value));
          return values;
        })
      );
  
      this.dataTableMyCompromises$.subscribe((res) => this.createTable(res));
    } else if (this.type === 'create') {
      this.createTable([]);
    }
  }

  createTable(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource?.paginator && (this.dataSource.paginator = this.paginator);
    this.paginator &&  (this.paginator.pageSize = 10);
  }

  private transformToPorcentaje(value: Compromise): Compromise {
    value.percentageAvance = value.commitmentAdvance;
    if(value.measureId == 2 || value.measureId == 3){
      const porcentaje = (value.commitmentAdvance / value.commitmentGoal) * 100;
      value.percentageAvance = Math.round(porcentaje * 100) / 100;
    }
    return value;
  }

  public showDialog(type: string, compromise?: any): void {
    const dialogConfig = new MatDialogConfig();
    if ( (type === 'edit' || type === 'managment') && compromise) {
      dialogConfig.data = compromise;
      dialogConfig.data['type'] = type;
      dialogConfig.data['dialogRef'] = this.dialog;
      dialogConfig.data['getForm'] = !!(this.type === 'create');
    }

    if (this.type === 'create') {
      dialogConfig.data = {};
      dialogConfig.data['getForm'] = true;
    }

    const dialogRef = this.dialog.open(DialogFormCompromisoComponent, dialogConfig )
    dialogRef.afterClosed().subscribe((value: DataDialogFormCompromisos) => {
      if (value?.flag === 'create' || value?.flag === 'edit' || value?.flag === 'managment') {
        this.showSuccess = true;
        this.loadDataTable$.next();
        this.messageSuccess = value?.flag === 'create' ? 'Compromiso creado con éxito' :
        value?.flag === 'edit' ? 'La información del Compromiso se ha actualizado con éxito' :
        value?.flag === 'managment' ? 'Compromiso actualizado con éxito' : '';
      }

      if (value?.form) {
        let dataTable = this.transformToPorcentaje(value?.form)
        this.dataSourceStorage.push(dataTable)
        this.createTable(this.dataSourceStorage)
        this.onAddCompromise.emit(this.dataSource.data)
      }
    })
  }

  public deleteCompromise(compromiseToDelete: Compromise): void {
    this.dataSourceStorage = this.dataSourceStorage.filter((compromise: Compromise) => compromise.commitmentDescribe !== compromiseToDelete.commitmentDescribe)
    this.createTable(this.dataSourceStorage)
    
  }
}
