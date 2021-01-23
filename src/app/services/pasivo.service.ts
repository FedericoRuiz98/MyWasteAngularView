import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Pasivo } from '../models/Pasivo';
import { HttpConsoleResponse } from '../util/httpConsoleResponse';
import endsPoints from './config/endsPoints.json'
import { GlobalServiceService } from './global-service.service';

@Injectable({
  providedIn: 'root'
})
export class PasivoService extends GlobalServiceService{
  
  url = this.baseurl+endsPoints.Pasivo;

  constructor(private http : HttpClient) {
    super();
  }

  public getAllPasivos() : Observable<Pasivo[]> {
    const httpResp = this.http.get<Pasivo[]>(this.url).pipe(shareReplay());
    this.debugResponse(httpResp,"Pasivos");
    return httpResp;
  }

  public getPasivoById(id : number) : Observable<Pasivo[]> {
    const httpResp = this.http.get<Pasivo[]>(this.url+"/"+id).pipe(shareReplay());
    this.debugResponse(httpResp,"Pasivos");
    return httpResp;
  }

  public getPasivoByEgreso(id : number) : Observable<Pasivo[]> {
    const httpResp = this.http.get<Pasivo[]>(this.url+"/byEgreso/"+id).pipe(shareReplay());
    this.debugResponse(httpResp,"Pasivos");
    return httpResp;
  }

  public createPasivo(pasivo : Pasivo) : Observable<Pasivo> {
    let todayDate = new Date();
    const httpResp = this.http.post<Pasivo>(this.url,{
      "idPasivo": pasivo.idPasivo,
      "idCategoria": pasivo.idCategoria,
      "idFormaDePago": pasivo.idFormaDePago,
      "idEgreso": pasivo.idEgreso,
      "fecha": todayDate,
      "total": pasivo.total,
      "cuotas": pasivo.cuotas,
    }).pipe(shareReplay());
    this.debugResponse(httpResp,"Pasivos");
    return httpResp;
  }

  public updatePasivo(pasivo : Pasivo) : Observable<Pasivo> {
    let todayDate = new Date();
    const httpResp = this.http.post<Pasivo>(this.url+"/edit",{
      "idPasivo": pasivo.idPasivo,
      "idCategoria": pasivo.idCategoria,
      "idFormaDePago": pasivo.idFormaDePago,
      "idEgreso": pasivo.idEgreso,
      "fecha": todayDate,
      "total": pasivo.total,
      "cuotas": pasivo.cuotas,
    }).pipe(shareReplay());
    this.debugResponse(httpResp,"Pasivos");
    return httpResp;
  }
}
