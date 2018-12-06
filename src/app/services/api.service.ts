import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataElements } from 'app/dashboard/dashboard.interface';
import { PeriodicElement } from 'app/list/list.interface';
import { Observable } from 'rxjs';

import {publishReplay, map, refCount} from 'rxjs/operators';

const API = 'https://tools.texoit.com/backend-java/api/movies';

@Injectable({
  providedIn: 'root'
})
export class apiService {
  
  _allData: Observable<any> = null;
  _size: Observable<any> = null;
  _multipleWinners: Observable<any> = null;
  _studios: Observable<any> = null;
  _maxMin: Observable<any> = null;
  
  constructor(private http: HttpClient) {}

  getByYear(year: number){ 
    return this.http
      .get<Object[]>(API+'?winner=true&year='+year);
  }

  clearCache() {
    this._allData = null;
    this._size = null;
    this._multipleWinners = null;
    this._studios = null;
    this._maxMin = null;
  }

  //WITH CACHE
  getSize() {
    if (!this._size) {
      this._size = this.http
      .get<PeriodicElement>(API+'?page=0&size=1').pipe(
        map(res => res.totalElements),
        publishReplay(1),
        refCount(),
      );
    }
    return this._size;
  }

  getData(total: number) {
    if (!this._allData) {
      this._allData = this.http
      .get<PeriodicElement>(API+'?page=0&size='+total).pipe(
        map(res => res.content),
        publishReplay(1),
        refCount(),
      );
    }
    return this._allData;
  }

  getMultipleWinners() {
    if (!this._multipleWinners) {
      this._multipleWinners = this.http
      .get<DataElements>(API+'?projection=years-with-multiple-winners').pipe(
        map(res => res.years),
        publishReplay(1),
        refCount(),
      );
    }
    return this._multipleWinners;
  }

  getStudios() {
    if (!this._studios) {
      this._studios = this.http
      .get<DataElements>(API+'?projection=studios-with-win-count').pipe(
        map(res => res.studios),
        publishReplay(1),
        refCount(),
      );
    }
    return this._studios;
  }

  getMaxMin() {
    if (!this._maxMin) {
      this._maxMin = this.http
      .get<DataElements>(API+'?projection=max-min-win-interval-for-producers').pipe(
        publishReplay(1),
        refCount(),
      );
    }
    return this._maxMin;
  }

}
