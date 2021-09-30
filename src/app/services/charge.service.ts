import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICharge } from '../models/charge';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { chargePath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) {

  }

  //les requetes
  findCharges(): Observable<MyHttpResponses<ICharge>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(chargePath.findAll);
  }


  findChargeByLocation(jsonValue: any): Observable<MyHttpResponses<ICharge>> {
    //requete get n'a pas de parametre que l'url
    return this.http.post<any>(chargePath.findByLocation, jsonValue);
  }

  findCharge(jsonValue: any): Observable<MyHttpResponse<ICharge>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(chargePath.find, jsonValue);
  }

  addCharge(jsonValue: any): Observable<MyHttpResponse<ICharge>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(chargePath.add, jsonValue);
  }

  updateCharge(jsonValue: any): Observable<MyHttpResponse<ICharge | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(chargePath.update, jsonValue);
  }

  deleteCharge(jsonValue: Object): Observable<MyHttpResponse<ICharge | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(chargePath.delete, jsonValue);
  }


}
