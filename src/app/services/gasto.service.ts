import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalServiceService } from './global-service.service';
import endsPoints from './config/endsPoints.json'
import { Observable } from 'rxjs';
import { Gasto } from '../models/Gasto';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GastoService extends GlobalServiceService{

  constructor(private http : HttpClient) {
    super();
   }

   getAllGasto() : Observable<Gasto[]> {
    this.url = this.baseurl+endsPoints.Gasto;
    const httpResp = this.http.get<Gasto[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Gastos");
    return httpResp;
   }

   getGastoByPasivo(id : number) : Observable<Gasto[]> {
    this.url = this.baseurl+endsPoints.Gasto;
    const httpResp = this.http.get<Gasto[]>(this.url+"/bypasivo/"+id).pipe(shareReplay());
    this.debugResponse(httpResp,"Gastos");
    return httpResp;
   }

   createGasto(gasto : Gasto) : Observable<Gasto> {
    this.url = this.baseurl+endsPoints.Gasto;
    const httpResp = this.http.post<Gasto>(this.url,{
      "idSubCategoria": gasto.idSubCategoria,
      "idPasivo": gasto.idPasivo,
      "monto": gasto.monto,
      "concepto": gasto.concepto
    }).pipe(shareReplay());
    this.debugResponse(httpResp,"Gastos");
    return httpResp;
   }
   
}

