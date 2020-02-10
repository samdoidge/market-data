import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<any> {
    return this.http.get('https://a.c-dn.net/b/2Me8Xl.json#data.json');
  }
}
