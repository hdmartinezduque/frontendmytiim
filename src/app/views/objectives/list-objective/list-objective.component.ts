import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Objective } from '../../../shared/interfaces/objectives/objective.interface';
import { ObjetiveServicesService } from '../../../shared/services/objetive-services/objetive-services.service';
import { MatSort } from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';

@Component({
  selector: 'app-list-objective',
  templateUrl: './list-objective.component.html',
  styleUrls: ['./list-objective.component.scss']
})
export class ListObjectiveComponent implements OnInit {

  // Solo se utiliza para las tablas
  displayedColumns: string[] = ['description', 'category', 'state', 'actions'];
  objective: Objective[] = [];
  dataSource: MatTableDataSource<Objective>;
  tbDataSource: any = [];
  searchTerm: string = '';
  filteredData: any = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private objetiveService: ObjetiveServicesService,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.dataSource = new MatTableDataSource<Objective>(this.objective);
  }

  ngOnInit() {
    this.getObjetives();
  }

  getObjetives(){
    this.objetiveService.getObjectives().subscribe(resp => {
      //console.log(resp);
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

  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.tbDataSource.filter = filterValue;
  }

}

