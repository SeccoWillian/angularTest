import { Component, OnInit } from '@angular/core';
import { apiService } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  multWin: Object[];
  topTree: Object[];
  maximum: Object[];
  minimum: Object[];
  winYear: Object[];

  constructor(private apiService: apiService) { }

  ngOnInit(): void {
    this.apiService.getMultipleWinners()
      .subscribe(data => {
        this.multWin = data;
      },
        err => console.log(err.message)
      );

    this.apiService.getStudios()
      .subscribe(data => {
        this.topTree = data;
      },
        err => console.log(err.message)
      );

    this.apiService.getMaxMin()
      .subscribe(data => {
        this.maximum = data.max;
        this.minimum = data.min;
      },
        err => console.log(err.message)
      );
  }

  search(year: number){
    this.apiService.getByYear(year)
      .subscribe(data => {
        this.winYear = data;
      },
        err => console.log(err.message)
      );
  }

}
