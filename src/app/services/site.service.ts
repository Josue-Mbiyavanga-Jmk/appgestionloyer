import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sitePath } from './httpPath';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { ISite } from '../models/site';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findSites(): Observable<MyHttpResponses<ISite>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(sitePath.findAll);
  }

  findSite(jsonValue: any): Observable<MyHttpResponse<ISite>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(sitePath.find, jsonValue);
  }

  addSite(jsonValue: any): Observable<MyHttpResponse<ISite>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(sitePath.add, jsonValue);
  }

  updateSite(jsonValue: any): Observable<MyHttpResponse<ISite | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(sitePath.update, jsonValue);
  }

  deleteSite(jsonValue: Object): Observable<MyHttpResponse<ISite | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(sitePath.delete, jsonValue);
  }

}




