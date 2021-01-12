import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../models/Persona';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private readonly baseurl = endsPoints.api;
  private url = this.baseurl+endsPoints.Persona;

  constructor(private http : HttpClient) { }

  public createPersona(persona : Persona) : Observable<Persona> {  
    const body = {
      "nombre": persona.nombre,
      "apellido": persona.apellido
    };

    const httpResp = this.http.post<Persona>(this.url,body);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }

  public getAllPeronas() : Observable<Persona[]> {
    const httpResp = this.http.get<Persona[]>(this.url);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }

  public getPersona(id : number) : Observable<Persona> {
    const httpResp = this.http.get<Persona>(this.url+"/"+id);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }

}
