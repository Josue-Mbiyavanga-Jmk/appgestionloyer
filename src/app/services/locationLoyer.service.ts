import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { ILocationLoyer } from '../models/locationLoyer';
import { locationLoyerPath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class LocationLoyerService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findLoyers(): Observable<MyHttpResponses<ILocationLoyer>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(locationLoyerPath.findAll);
  }


  findLoyersByLocation(jsonValue: any): Observable<MyHttpResponses<ILocationLoyer>> {
    //requete get n'a pas de parametre que l'url
    return this.http.post<any>(locationLoyerPath.findByLocation, jsonValue);
  }

  findLoyer(jsonValue: any): Observable<MyHttpResponse<ILocationLoyer>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationLoyerPath.find, jsonValue);
  }

  addLoyer(jsonValue: any): Observable<MyHttpResponse<ILocationLoyer>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationLoyerPath.add, jsonValue);
  }

  updateLoyer(jsonValue: any): Observable<MyHttpResponse<ILocationLoyer | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationLoyerPath.update, jsonValue);
  }

  deleteLoyer(jsonValue: Object): Observable<MyHttpResponse<ILocationLoyer | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationLoyerPath.delete, jsonValue);
  }


}
