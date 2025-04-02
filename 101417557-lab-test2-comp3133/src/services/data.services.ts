import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Launch } from '../models/spaceX.model';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'https://api.spacexdata.com/v3/launches';

  constructor(private http: HttpClient) { }

  getLaunches(): Observable<Launch[]> {
    return this.http.get<Launch[]>(this.apiUrl);
  }

  getFilteredLaunches(filter: { [key: string]: any}): Observable<Launch[]> {
    // allow for data mutation with new parameters
    const paramsSet = new URLSearchParams();

    // case hanedleing if the data is not filtered
    if (Object.keys(filter).length === 0) {
      return this.http.get<Launch[]>(this.apiUrl);
    }

    // filter application on values that are being set
    for (const [key, value] of Object.entries(filter)) {
      paramsSet.set(key, value);
    }

    // setting the new api with filters
    const filteredApiUrl = `${this.apiUrl}?${paramsSet.toString()}`;
    return this.http.get<Launch[]>(filteredApiUrl);
  }

}
