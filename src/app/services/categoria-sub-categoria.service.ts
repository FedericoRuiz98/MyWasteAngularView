import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaSubCategorias } from '../models/categoriaSubCategorias';
import { FormaDePago } from '../models/FormaDePago';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class CategoriaSubCategoriaService {

  private readonly baseurl = endsPoints.api;

  constructor(private http : HttpClient) { }

  public getAllCategoriasRelation() : Observable<CategoriaSubCategorias[]> {
    let url = this.baseurl+endsPoints.CategoriaSubCategoria;
    const httpResp = this.http.get<CategoriaSubCategorias[]>(url);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }
}
