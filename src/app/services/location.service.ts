import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyHttpResponse, MyHttpResponses } from '../models/common';
import { ILocation } from '../models/location';
import { locationPath } from './httpPath';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  //toujours injecter HttpClient
  constructor(private http: HttpClient) { }

  //les requetes
  findLocations(): Observable<MyHttpResponses<ILocation>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(locationPath.findAll);
  }

  findValidLocations(): Observable<MyHttpResponses<ILocation>> {
    //requete get n'a pas de parametre que l'url
    return this.http.get<any>(locationPath.findAllValid);
  }

  findLocationsByLocal(jsonValue: any): Observable<MyHttpResponses<ILocation>> {
    //requete get n'a pas de parametre que l'url
    return this.http.post<any>(locationPath.findByLocal, jsonValue);
  }

  findLocationsByLocataire(jsonValue: any): Observable<MyHttpResponses<ILocation>> {
    //requete get n'a pas de parametre que l'url
    return this.http.post<any>(locationPath.findByLocataire, jsonValue);
  }

  findLocation(jsonValue: any): Observable<MyHttpResponse<ILocation>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationPath.find, jsonValue);
  }

  addLocation(jsonValue: any): Observable<MyHttpResponse<ILocation>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationPath.add, jsonValue);
  }

  updateLocation(jsonValue: any): Observable<MyHttpResponse<ILocation | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationPath.update, jsonValue);
  }

  deleteLocation(jsonValue: Object): Observable<MyHttpResponse<ILocation | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationPath.delete, jsonValue);
  }

  stopLocation(jsonValue: Object): Observable<MyHttpResponse<ILocation | undefined>> {
    //requete post a un parametre en plus de l'url
    return this.http.post<any>(locationPath.stop, jsonValue);
  }

}
