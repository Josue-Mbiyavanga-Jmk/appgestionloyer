import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { ILocal } from '../models/local';
import { localPath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findLocals(): Observable<MyHttpResponses<ILocal>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(localPath.findAll);
  }

  findLocalsBySite(jsonValue: any): Observable<MyHttpResponses<ILocal>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(localPath.findBySite, jsonValue);
  }

  findLocal(jsonValue: any): Observable<MyHttpResponse<ILocal>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(localPath.find, jsonValue);
  }

  addLocal(jsonValue: any): Observable<MyHttpResponse<ILocal>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(localPath.add, jsonValue);
  }

  updateLocal(jsonValue: any): Observable<MyHttpResponse<ILocal | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(localPath.update, jsonValue);
  }

  deleteLocal(jsonValue: Object): Observable<MyHttpResponse<ILocal | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(localPath.delete, jsonValue);
  }

}
