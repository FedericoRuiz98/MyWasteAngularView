import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/Categoria';
import { FormaDePago } from '../models/FormaDePago';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'

@Injectable({
  providedIn: 'root'
})
export class FormaDePagoService {

  private readonly baseurl = endsPoints.api;

  constructor(private http : HttpClient) { }

  public getAllFormasDePago() : Observable<FormaDePago[]> {
    let url = this.baseurl+endsPoints.FormaDePago;
    const httpResp = this.http.get<FormaDePago[]>(url);
    HttpConsoleResponse.printResponse(httpResp);

    return httpResp;
  }
}
