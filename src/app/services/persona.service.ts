import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Persona } from '../models/auth/Persona';
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

    const httpResp = this.http.post<Persona>(this.url,body).pipe(shareReplay());
    HttpConsoleResponse.printResponse(httpResp,"Personas");

    return httpResp;
  }

  public getAllPeronas() : Observable<Persona[]> {
    const httpResp = this.http.get<Persona[]>(this.url).pipe(shareReplay());
    HttpConsoleResponse.printResponse(httpResp,"Personas");

    return httpResp;
  }

  public getPersona(id : number) : Observable<Persona> {
    const httpResp = this.http.get<Persona>(this.url+"/"+id).pipe(shareReplay());
    HttpConsoleResponse.printResponse(httpResp,"Personas");

    return httpResp;
  }

}
