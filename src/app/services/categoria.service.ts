import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly baseurl = endsPoints.api;

  constructor(private http : HttpClient) { }

  public getAllCategorias() : Observable<Categoria[]> {
    let url = this.baseurl+endsPoints.Categoria;
    const httpResp = this.http.get<Categoria[]>(url);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }
}
