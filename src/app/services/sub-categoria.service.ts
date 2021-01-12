import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubCategoria } from '../models/SubCategoria';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

  private readonly baseurl = endsPoints.api;

  constructor(private http : HttpClient) { }

  public getAllSubCategorias() : Observable<SubCategoria[]> {
    let url = this.baseurl+endsPoints.SubCategoria;
    const httpResp = this.http.get<SubCategoria[]>(url);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }
}
