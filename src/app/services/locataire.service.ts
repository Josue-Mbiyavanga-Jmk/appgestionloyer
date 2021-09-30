import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { ILocataire } from '../models/locataire';
import { locatairePath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class LocataireService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findLocataires(): Observable<MyHttpResponses<ILocataire>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(locatairePath.findAll);
  }

  findLocataire(jsonValue: any): Observable<MyHttpResponse<ILocataire>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locatairePath.find, jsonValue);
  }

  addLocataire(jsonValue: any): Observable<MyHttpResponse<ILocataire>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locatairePath.add, jsonValue);
  }

  updateLocataire(jsonValue: any): Observable<MyHttpResponse<ILocataire | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locatairePath.update, jsonValue);
  }

  deleteLocataire(jsonValue: Object): Observable<MyHttpResponse<ILocataire | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locatairePath.delete, jsonValue);
  }

}
