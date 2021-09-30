import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { IPaiement } from '../models/paiement';
import { paiementPath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findPaiements(): Observable<MyHttpResponses<IPaiement>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(paiementPath.findAll);
  }


  findPaiementsLoyer(): Observable<MyHttpResponses<IPaiement>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(paiementPath.findAllLoyer);
  }

  findPaiementsCharge(): Observable<MyHttpResponses<IPaiement>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(paiementPath.findAllCharge);
  }

  findPaiement(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.find, jsonValue);
  }

  findPaiementByLocation(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.findByLocation, jsonValue);
  }

  findPaiementLoyerByLocation(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.findLoyerByLocation, jsonValue);
  }

  findPaiementChargeByLocation(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.findChargeByLocation, jsonValue);
  }


  addPaiement(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.add, jsonValue);
  }

  updatePaiement(jsonValue: any): Observable<MyHttpResponse<IPaiement | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.update, jsonValue);
  }

  deletePaiement(jsonValue: Object): Observable<MyHttpResponse<IPaiement | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.delete, jsonValue);
  }

  CheckProcessPaiement(jsonValue: any): Observable<MyHttpResponse<IPaiement>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(paiementPath.checkProcess, jsonValue);
  }


}
