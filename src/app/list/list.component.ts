import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { apiService } from '../services/api.service';
import { PeriodicElement } from './list.interface';
import { isArray, isNumber, isString, isBoolean } from 'util';

@Component({
  selector: 'app-table-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'year', 'title', 'winner'];
  dataSource;
  year: string = ''; winner: string = '';
  totalElements: number = null;

  constructor(private apiService: apiService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.apiService.getSize()
      .subscribe(data => {
        this.totalElements = data;
        this.apiService.getData(this.totalElements)
          .subscribe(data => {
            this.dataSource = new MatTableDataSource<PeriodicElement>(data);
            this.dataSource.paginator = this.paginator;
          },
            err => console.log(err.message)
          );
      },
        err => console.log(err.message)
      );
  }

  getYear(filterValue: string){
    this.year = filterValue;
    this.applyFilter([this.year, this.winner]);
  }

  getWinner(filterValue: string){
    this.winner = filterValue;
    this.applyFilter([this.year, this.winner]);
  }

  applyFilter(filterValue: Array<string>) {
    this.dataSource.filterPredicate = (data, filters: Array<string>) => {
      const matchFilter = [];
      const filterArray = filters;
      const columns = (<any>Object).values(data);
      
      filterArray.forEach(filter => {
        const customFilter = [];
        columns.forEach(column => {
          if(isBoolean(column) || isNumber(column)){
            customFilter.push(column.toString().includes(filter))
          }
        });
        matchFilter.push(customFilter.some(Boolean));
      });
      return matchFilter.every(Boolean);
    }

    this.dataSource.filter = filterValue;
  }
}


